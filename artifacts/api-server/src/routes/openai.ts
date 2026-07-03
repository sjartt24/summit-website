import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, conversations, messages } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import {
  ListOpenaiConversationsResponse,
  CreateOpenaiConversationBody,
  CreateOpenaiConversationResponse,
  GetOpenaiConversationResponse,
  ListOpenaiMessagesResponse,
  SendOpenaiMessageBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

const SYSTEM_PROMPT =
  "You are the friendly, knowledgeable customer support assistant for Summit Outdoor Adventures, a premium guided outdoor adventure company offering hiking, climbing, kayaking, and backcountry expedition trips in the Rockies. Answer questions about trips, pricing, gear, booking, and safety with warmth and expertise. Keep responses concise and helpful. If you don't know something specific, suggest the customer use the booking or contact form.";

router.get("/openai/conversations", async (_req, res) => {
  const rows = await db.select().from(conversations).orderBy(desc(conversations.createdAt));
  res.json(ListOpenaiConversationsResponse.parse(rows));
});

router.post("/openai/conversations", async (req, res) => {
  const body = CreateOpenaiConversationBody.parse(req.body);
  const [row] = await db.insert(conversations).values(body).returning();
  res.status(201).json(CreateOpenaiConversationResponse.parse(row));
});

router.get("/openai/conversations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conversation) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const rows = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json(GetOpenaiConversationResponse.parse({ ...conversation, messages: rows }));
});

router.delete("/openai/conversations/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(conversations).where(eq(conversations.id, id));
  res.status(204).send();
});

router.get("/openai/conversations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const rows = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json(ListOpenaiMessagesResponse.parse(rows));
});

router.post("/openai/conversations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conversation) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  const body = SendOpenaiMessageBody.parse(req.body);

  await db.insert(messages).values({ conversationId: id, role: "user", content: body.content });

  const history = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let fullResponse = "";

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    await db.insert(messages).values({ conversationId: id, role: "assistant", content: fullResponse });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } catch (err) {
    req.log.error({ err }, "openai stream failed");
    res.write(`data: ${JSON.stringify({ error: "Something went wrong. Please try again." })}\n\n`);
  } finally {
    res.end();
  }
});

export default router;

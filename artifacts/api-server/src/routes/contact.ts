import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, contactMessagesTable, newsletterSubscribersTable } from "@workspace/db";
import {
  ListContactMessagesResponse,
  CreateContactMessageBody,
  CreateContactMessageResponse,
  ListNewsletterSubscribersResponse,
  CreateNewsletterSubscriberBody,
  CreateNewsletterSubscriberResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/contact-messages", async (_req, res) => {
  const rows = await db.select().from(contactMessagesTable).orderBy(desc(contactMessagesTable.createdAt));
  res.json(ListContactMessagesResponse.parse(rows));
});

router.post("/contact-messages", async (req, res) => {
  const body = CreateContactMessageBody.parse(req.body);
  const [row] = await db.insert(contactMessagesTable).values(body).returning();
  res.status(201).json(CreateContactMessageResponse.parse(row));
});

router.get("/newsletter/subscribers", async (_req, res) => {
  const rows = await db
    .select()
    .from(newsletterSubscribersTable)
    .orderBy(desc(newsletterSubscribersTable.subscribedAt));
  res.json(ListNewsletterSubscribersResponse.parse(rows));
});

router.post("/newsletter/subscribers", async (req, res) => {
  const body = CreateNewsletterSubscriberBody.parse(req.body);
  const [row] = await db
    .insert(newsletterSubscribersTable)
    .values(body)
    .onConflictDoUpdate({ target: newsletterSubscribersTable.email, set: { email: body.email } })
    .returning();
  res.status(201).json(CreateNewsletterSubscriberResponse.parse(row));
});

export default router;

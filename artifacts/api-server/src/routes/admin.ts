import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import {
  db,
  appointmentsTable,
  contactMessagesTable,
  newsletterSubscribersTable,
} from "@workspace/db";
import { GetAdminSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/admin/summary", async (_req, res) => {
  const [[appointmentCount], [pendingCount], [subscriberCount], [messageCount], recentAppointments, recentContactMessages, recentSubscribers] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(appointmentsTable),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(appointmentsTable)
        .where(eq(appointmentsTable.status, "pending")),
      db.select({ count: sql<number>`count(*)::int` }).from(newsletterSubscribersTable),
      db.select({ count: sql<number>`count(*)::int` }).from(contactMessagesTable),
      db.select().from(appointmentsTable).orderBy(desc(appointmentsTable.createdAt)).limit(5),
      db.select().from(contactMessagesTable).orderBy(desc(contactMessagesTable.createdAt)).limit(5),
      db.select().from(newsletterSubscribersTable).orderBy(desc(newsletterSubscribersTable.subscribedAt)).limit(5),
    ]);

  const data = {
    totalAppointments: appointmentCount.count,
    pendingAppointments: pendingCount.count,
    totalSubscribers: subscriberCount.count,
    totalContactMessages: messageCount.count,
    recentAppointments,
    recentContactMessages,
    recentSubscribers,
  };

  res.json(GetAdminSummaryResponse.parse(data));
});

export default router;

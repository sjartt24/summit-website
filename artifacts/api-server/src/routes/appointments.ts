import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, appointmentsTable } from "@workspace/db";
import {
  ListAppointmentsResponse,
  CreateAppointmentBody,
  CreateAppointmentResponse,
  UpdateAppointmentStatusBody,
  UpdateAppointmentStatusResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/appointments", async (_req, res) => {
  const rows = await db.select().from(appointmentsTable).orderBy(desc(appointmentsTable.createdAt));
  res.json(ListAppointmentsResponse.parse(rows));
});

router.post("/appointments", async (req, res) => {
  const body = CreateAppointmentBody.parse(req.body);
  const [row] = await db
    .insert(appointmentsTable)
    .values({ ...body, notes: body.notes ?? null })
    .returning();
  res.status(201).json(CreateAppointmentResponse.parse(row));
});

router.patch("/appointments/:id/status", async (req, res) => {
  const id = Number(req.params.id);
  const body = UpdateAppointmentStatusBody.parse(req.body);
  const [row] = await db
    .update(appointmentsTable)
    .set({ status: body.status })
    .where(eq(appointmentsTable.id, id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Appointment not found" });
    return;
  }
  res.json(UpdateAppointmentStatusResponse.parse(row));
});

export default router;

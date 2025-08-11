import { Router } from "express";
import {
  listAppointments,
  createAppointment,
  getAppointmentDetail,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController";
import auth from "../middleware/auth";

const router = Router();

router.use(auth);

router.get("/", listAppointments);

router.post("/", createAppointment);

router.get("/:id", getAppointmentDetail);

router.put("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;

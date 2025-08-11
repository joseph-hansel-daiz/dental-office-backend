import { Router } from "express";
import { listSchedules } from "../controllers/scheduleController";
import auth from "../middleware/auth";

const router = Router();

router.use(auth);

router.route("/").get(listSchedules);
export default router;

import { Router } from "express";
import { listDentists } from "../controllers/dentistController";

const router = Router();

router.route("/").get(listDentists);
export default router;

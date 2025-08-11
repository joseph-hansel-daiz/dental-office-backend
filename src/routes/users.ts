import { Router } from "express";
import {
  list,
  detail,
  profile,
  updateProfile,
} from "../controllers/userController";
import auth from "../middleware/auth";
import requireAdmin from "../middleware/requireAdmin";

const router = Router();

router.use(auth);

router.get("/me", profile);
router.put("/me", updateProfile);
router.get("/", requireAdmin, list);
router.get("/:id", requireAdmin, detail);

export default router;

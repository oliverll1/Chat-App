import express from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controllers/userControllers";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

export default router;
import express from "express";
import { protect } from "../middleware/authMiddleware";
import { allMessages, sendMessage } from "../controllers/messageControllers";

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;

export default router;

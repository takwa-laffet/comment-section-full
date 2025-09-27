import { Router } from "express";
import { addOrUpdateVote, removeVote, getCommentVotes } from "../controllers/voteController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, addOrUpdateVote);
router.delete("/", authenticate, removeVote);
router.get("/:comment_id", getCommentVotes);

export default router;

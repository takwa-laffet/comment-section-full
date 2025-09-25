import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createComment, getComments, updateComment, deleteComment } from "../controllers/commentController";

const router = Router();
router.post("/", authenticate, createComment);    
router.get("/", getComments);                     
router.put("/:id", authenticate, updateComment);  
router.delete("/:id", authenticate, deleteComment); 

export default router;

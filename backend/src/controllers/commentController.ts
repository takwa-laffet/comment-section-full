import { Request, Response } from "express";
import { db } from "../db"; // assume you have db connection
import { AuthRequest } from "../middleware/authMiddleware";

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { content, parent_id } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    if (!content) return res.status(400).json({ message: "Content is required" });

    const [result]: any = await db.query(
      "INSERT INTO comments (user_id, parent_id, content) VALUES (?, ?, ?)",
      [req.user.userId, parent_id || null, content]
    );

    res.status(201).json({ message: "Comment created", commentId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const [comments]: any = await db.query("SELECT * FROM comments ORDER BY created_at DESC");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const [rows]: any = await db.query("SELECT * FROM comments WHERE comment_id = ?", [id]);
    if (!rows.length) return res.status(404).json({ message: "Comment not found" });
    if (rows[0].user_id !== req.user.userId)
      return res.status(403).json({ message: "Forbidden: You can only edit your own comments" });

    await db.query("UPDATE comments SET content = ? WHERE comment_id = ?", [content, id]);
    res.json({ message: "Comment updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const [rows]: any = await db.query("SELECT * FROM comments WHERE comment_id = ?", [id]);
    if (!rows.length) return res.status(404).json({ message: "Comment not found" });
    if (rows[0].user_id !== req.user.userId)
      return res.status(403).json({ message: "Forbidden: You can only delete your own comments" });

    await db.query("DELETE FROM comments WHERE comment_id = ?", [id]);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

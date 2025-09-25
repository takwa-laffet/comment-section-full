import { Request, Response } from "express";
import { db } from "../db"
import { AuthRequest } from "../middleware/authMiddleware";

// Ajouter ou changer un vote
export const addOrUpdateVote = async (req: AuthRequest, res: Response) => {
  try {
    const { comment_id, vote_type } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!["up", "down"].includes(vote_type)) {
      return res.status(400).json({ message: "vote_type must be 'up' or 'down'" });
    }

    const [rows]: any = await db.query(
      "SELECT * FROM votes WHERE user_id = ? AND comment_id = ?",
      [userId, comment_id]
    );

    if (rows.length > 0) {
      await db.query(
        "UPDATE votes SET vote_type = ?, created_at = NOW() WHERE user_id = ? AND comment_id = ?",
        [vote_type, userId, comment_id]
      );
      return res.json({ message: "Vote updated successfully" });
    } else {
      await db.query(
        "INSERT INTO votes (user_id, comment_id, vote_type) VALUES (?, ?, ?)",
        [userId, comment_id, vote_type]
      );
      return res.json({ message: "Vote added successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const removeVote = async (req: AuthRequest, res: Response) => {
  try {
    const { comment_id } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await db.query("DELETE FROM votes WHERE user_id = ? AND comment_id = ?", [
      userId,
      comment_id,
    ]);

    return res.json({ message: "Vote removed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCommentVotes = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.params;

    const [rows]: any = await db.query(
      `SELECT 
          SUM(vote_type = 'up') AS upvotes,
          SUM(vote_type = 'down') AS downvotes
       FROM votes WHERE comment_id = ?`,
      [comment_id]
    );

    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

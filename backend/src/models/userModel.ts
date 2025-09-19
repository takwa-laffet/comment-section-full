import { db } from "../db"

export interface User {
  user_id?: number;
  username: string;
  email: string;
  password_hash: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const getUserByEmail = async (email: string) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return (rows as any)[0];
};

export const getUserById = async (id: number) => {
  const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [id]);
  return (rows as any)[0];
};

export const createUser = async (user: User) => {
  const { username, email, password_hash, avatar } = user;
  const [result] = await db.query(
    "INSERT INTO users (username, email, password_hash, avatar) VALUES (?, ?, ?, ?)",
    [username, email, password_hash, avatar || null]
  );
  return result;
};

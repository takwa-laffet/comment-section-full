import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/authRoutes";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// routes
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

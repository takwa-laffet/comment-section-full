import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import voteRoutes from "./routes/voteRoutes";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)

app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);
app.use("/api/votes", voteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

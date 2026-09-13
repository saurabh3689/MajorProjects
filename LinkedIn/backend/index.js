import authRouter from "./routes/auth.routes.js";
import express from "express";
import dotenv from "dotenv";
import connetDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import connectionRouter from "./routes/connection.routes.js";
import http from "http"
import { Server } from "socket.io";
import notificationRouter from "./routes/notification.routes.js";

dotenv.config();

let app = express();
let server = http.createServer(app)
export const io = new Server(server, {
  cors:({
    origin: "http://localhost:5173",
    credentials: true
  })
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
let port = process.env.PORT

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.get("/abc", (req, res) => {
//   res.send("Hello, World! This is abc route");
// });

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/connection", connectionRouter);
app.use("/api/notification", notificationRouter);
// isese -- http://localhost:8000/api/auth/singup  ho jayega
//jitne bhi routes hai authRouter me wo /api/auth ke niche aa jayenge
export const userSocketMap = new Map()
io.on("connection",(socket)=>{
  console.log("user connected", socket.id)
  socket.on("register", (userId)=>{
    userSocketMap.set(userId, socket.id)
  })
  socket.on("disconnect", (socket)=>{
    console.log("user disconnected", socket.id)
  })
})

server.listen(port, () => {
  connetDb();
  console.log("Server is running on port 8000");
});
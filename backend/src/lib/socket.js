import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Socket.io CORS configuration - allow both localhost and Vercel domains
const allowedSocketOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin) {
        return callback(null, true);
      }
      
      // Check if origin is in allowed list
      if (allowedSocketOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // In development, allow localhost on any port
      if (process.env.NODE_ENV !== "production" && origin.startsWith("http://localhost")) {
        return callback(null, true);
      }
      
      // In production, allow Vercel domains
      if (origin.includes("vercel.app") || origin.includes("vercel.com")) {
        return callback(null, true);
      }
      
      // Allow same-origin requests
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

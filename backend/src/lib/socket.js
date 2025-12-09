import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173","http://10.212.44.205","http://192.168.43.219"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	console.log("a user connected:", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId) {
		userSocketMap[userId] = socket.id;
		console.log("User mapped:", userId, "to", socket.id);
		socket.userId = userId;
	}

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// --- ADD THIS BLOCK FOR "TYPING" ---
	socket.on("typing", ({ receiverId }) => {

		console.log(`Typing event received from ${socket.id} for ${receiverId}`);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// Emit only to the specific receiver
			// We send 'socket.userId' so the receiver knows *who* is typing
			io.to(receiverSocketId).emit("typing", socket.userId);
		}
	});
	// --- END OF "TYPING" BLOCK ---

	// --- ADD THIS BLOCK FOR "STOP_TYPING" ---
	socket.on("stop_typing", ({ receiverId }) => {

		console.log(`Stop_typing event received from ${socket.id}`);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// Emit only to the specific receiver
			io.to(receiverSocketId).emit("stop_typing");
		}
	});
	// --- END OF "STOP_TYPING" BLOCK ---

	socket.on("disconnect", () => {
		console.log("user disconnected:", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
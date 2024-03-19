"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Express uygulamanızı HTTP sunucusuna dönüştürün
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
}); // Socket.IO sunucusunu oluşturun
(0, dotenv_1.config)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (_, res) => {
    res.send("Welcome to the artificium api.");
});
// Socket.IO bağlantılarını dinleyin
io.on("connection", (socket) => {
    console.log("a user connected id: " + socket.id);
    // Kullanıcı bağlantısını kesin
    socket.on("disconnect", () => {
        console.log("user disconnected id: " + socket.id);
    });
    // Kullanıcınin bir odaya katilmasi icin socket olustur
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        console.log("a user joined room: " + roomId + " user id: " + userId);
    });
    // Kullanıcının bir odadan ayrılması için socket oluştur
    socket.on("leave-room", (roomId, userId) => {
        socket.leave(roomId);
        console.log("a user left room: " + roomId + " user id: " + userId);
    });
    // Kullanıcının bir odaya mesaj göndermesi için socket oluştur
    socket.on("send-message", (roomId, message) => {
        io.to(roomId).emit("message", message);
        console.log("a user sent message to room: " + roomId + " message: " + message);
    });
});
// Set up the Express application to listen on port 3000
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

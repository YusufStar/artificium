import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { config } from "dotenv";

const app = express();
const server = http.createServer(app); // Express uygulamanızı HTTP sunucusuna dönüştürün
const io = new Server(server, {
  cors: {
    origin: "*",
  },
}); // Socket.IO sunucusunu oluşturun

config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.send("Welcome to the artificium api.");
});

// Socket.IO bağlantılarını dinleyin
io.on("connection", (socket: Socket) => {
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
});

// Set up the Express application to listen on port 3000
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

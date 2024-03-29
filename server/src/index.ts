import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { config } from "dotenv";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import pino from "pino";
import OpenAI from "openai";

config();

const loger = pino();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const app = express();
const server = http.createServer(app); // Express uygulamanızı HTTP sunucusuna dönüştürün
const prisma = new PrismaClient();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
}); // Socket.IO sunucusunu oluşturun

app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));

const main = async () => {
  // Prisma ile veritabanına bağlanın
  await prisma.$connect();
};

main().catch((e) => {
  throw e;
});

// Socket.IO bağlantılarını dinleyin
io.on("connection", (socket: Socket) => {
  loger.info("a user connected id: " + socket.id);

  // Kullanıcı bağlantısını kesin
  socket.on("disconnect", () => {
    loger.info("a user disconnected id: " + socket.id);
  });

  // Kullanıcınin bir odaya katilmasi icin socket olustur
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    loger.info("a user joined room: " + roomId + " user id: " + userId);
  });

  // Kullanıcının bir odadan ayrılması için socket oluştur
  socket.on("leave-room", (roomId, userId) => {
    socket.leave(roomId);
    loger.info("a user left room: " + roomId + " user id: " + userId);
  });

  // Kullanıcının bir odaya mesaj göndermesi için socket oluştur
  socket.on("send-message", (roomId, message) => {
    io.to(roomId).emit("message", message);
    loger.info(
      {
        message: message.content,
        firstName: message.author.firstName,
        lastName: message.author.lastName,
      },
      "a user sent message to room: " + roomId
    );

    const ats_regex = message.content.match(/@(\w+)/g);
    if (ats_regex) {
      ats_regex.forEach(async (at: string) => {
        const username = at.slice(1);
        if (username === "artificium") {
          const user = await prisma.user.findUnique({
            where: {
              firstName: username.toLowerCase(),
            },
          });

          const completion = await openai.chat.completions.create({
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant. I am a user. you name is artificium. I am asking for help.",
              },
              {
                role: "user",
                content: message.content,
              },
            ],
            model: "gpt-4-turbo-preview",
          });

          const response = await prisma.message.create({
            data: {
              content:
                "@" + message?.author?.firstName + " " + completion.choices[0].message.content,
              author: {
                connect: {
                  id: user?.id,
                },
              },
              artificium: {
                connect: {
                  id: message.artificiumId,
                },
              },
            },
            include: {
              author: true,
            },
          });

          io.to(roomId).emit("message", response);
          loger.info(
            {
              message: response.content,
              firstName: response.author.firstName,
              lastName: response.author.lastName,
            },
            "artificium replied to user: "
          );
        }
      });
    }
  });
});

// Set up the Express application to listen on port 3000
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  loger.info(`Server is running on port ${PORT}`);
});

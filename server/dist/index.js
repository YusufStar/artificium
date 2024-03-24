"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const pino_1 = __importDefault(require("pino"));
const loger = (0, pino_1.default)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Express uygulamanızı HTTP sunucusuna dönüştürün
const prisma = new client_1.PrismaClient();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
}); // Socket.IO sunucusunu oluşturun
(0, dotenv_1.config)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.urlencoded({ extended: false }));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Prisma ile veritabanına bağlanın
    yield prisma.$connect();
});
main().catch((e) => {
    throw e;
});
// Socket.IO bağlantılarını dinleyin
io.on("connection", (socket) => {
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
        loger.info("a user sent message to room: " + roomId, {
            message: message.content,
            firstName: message.author.firstName,
            lastName: message.author.lastName,
        });
        const ats_regex = message.content.match(/@(\w+)/g);
        if (ats_regex) {
            ats_regex.forEach((at) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const username = at.slice(1);
                if (username === "artificium") {
                    const user = yield prisma.user.findUnique({
                        where: {
                            firstName: username.toLowerCase(),
                        },
                    });
                    const response = yield prisma.message.create({
                        data: {
                            content: "@" +
                                ((_a = message === null || message === void 0 ? void 0 : message.author) === null || _a === void 0 ? void 0 : _a.firstName) +
                                " " +
                                "Merhaba ben artificium!",
                            author: {
                                connect: {
                                    id: user === null || user === void 0 ? void 0 : user.id,
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
                    loger.info("artificium replied to user: ", {
                        message: response.content,
                        firstName: response.author.firstName,
                        lastName: response.author.lastName,
                    });
                }
            }));
        }
    });
});
// Set up the Express application to listen on port 3000
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    loger.info(`Server is running on port ${PORT}`);
});

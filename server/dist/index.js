"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and types
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
// Create an Express application
const app = (0, express_1.default)();
(0, dotenv_1.config)();
// Configure middleware for parsing JSON and URL-encoded data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (_, res) => {
    res.send('Welcome to the artificium api.');
});
// Set up the Express application to listen on port 3000
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

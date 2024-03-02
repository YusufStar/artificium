// Import necessary modules and types
import express, { Router } from "express";
import { config } from "dotenv";

// Create an Express application
const app = express();
config();

// Configure middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
    res.send('Welcome to the artificium api.')
})

// Set up the Express application to listen on port 3000
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

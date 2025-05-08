const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const config = require("./config/database");
const syncRoutes = require("./routes/syncRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

mongoose
    .connect(config.mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.log("MongoDB connection error:", err);
        process.exit(1);
    });

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later",
});
app.use("/api", limiter);

// Routes
app.use("/api", syncRoutes);

// Global error handler
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

module.exports = app;

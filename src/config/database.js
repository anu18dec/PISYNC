require("dotenv").config();

module.exports = {
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/pisync",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    },
};

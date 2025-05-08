module.exports = (err, req, res, next) => {
    console.log("API Error:", err);

    const statusCode = err.statusCode || 500;
    const errorMessage = statusCode === 500 ? "Internal server error" : err.message;

    // Send response
    res.status(statusCode).json({
        status: "error",
        message: errorMessage,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

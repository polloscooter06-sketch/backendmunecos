function errorHandler(err, req, res, next) {
  console.error("🔥 ERROR:", err);

  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Error interno del servidor"
      : err.message;

  res.status(status).json({
    success: false,
    message
  });
}

module.exports = errorHandler;


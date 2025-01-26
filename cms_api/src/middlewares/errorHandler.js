// Global Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.error(`[ERROR] ${err.message}`);

  // Send a generic error response
  return res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message || "Internal Server Error",
  });
};

export const asyncHandler = (handler) => (req, res, next) => {
  handler(req, res, next).catch(next);
};

export const syncHandler = (handler) => (req, res, next) => {
  try {
    handler(req, res, next);
  } catch (e) {
    next(e);
  }
};

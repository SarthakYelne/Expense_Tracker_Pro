const errorHandler = (error, req, res, next) => {
  if (error) {
    res.status(400).json({
      status: "failed",
      error: error,
    });
  } else {
    next();
  }
};

module.exports = errorHandler;

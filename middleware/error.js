class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  

  const createCustomError = (msg, statusCode = 404) => {
    return new CustomError(msg, statusCode);
  };

  const customError = (err, req, res, next) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: "please try again" });
  };
  
  module.exports = {customError, CustomError, createCustomError};
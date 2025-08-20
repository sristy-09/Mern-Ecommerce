class HandleError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HandleError;

// this only creates the structure of handleError(message, statusCode) but the functionality of displaying error message is done in error.js file

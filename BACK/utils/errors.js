class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends AppError {
  constructor(message = "bad request") {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

class NotFoundError extends AppError {
  constructor(message = "not found") {
    super(message, 404);
  }
}

export { AppError, BadRequestError, UnauthorizedError, NotFoundError };

const { statusCode } = require("../Core/Constants");

class ResponseHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  sender(data, message, status) {
    let sendData = data ? { data: data } : {};
    return this.res.status(status).json({
      ...sendData,
      message,
    });
  }

  success(data, message) {
    return this.sender(data, message || "Resource retrieved successfully!", statusCode.SUCCESS);
  }

  created(data, message) {
    return this.sender(data, message || "Resource created successfully!", statusCode.CREATED);
  }

  badRequest() {
    return this.sender(null, "Bad request", statusCode.BAD_REQUEST);
  }

  unAuthorized(data) {
    return this.sender(data, "authorization required", statusCode.UNAUTHORIZED);
  }

  notFound() {
    return this.sender(null, "Sorry, the requested resource was not found.", statusCode.NOT_FOUND);
  }

  validationError(errors, message) {
    return this.sender(errors, message || "Validation error", statusCode.VALIDATION_ERR);
  }

  serverError(errors, message) {
    return this.sender(errors, message || "Internal error", statusCode.INTERNAL_ERR);
  }
}

module.exports = ResponseHandler;

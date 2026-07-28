export class HttpResponseBuilder {
  static buildSuccessResponse(req, res, statusCode, message, data) {
    const response = {
      success: true,
      data,
      message,
      statusCode,
    };
    res.status(statusCode).json(response);
  }
  static buildErrorResponse(req, res, statusCode, error) {
    const response = {
      success: false,
      message: error,
      statusCode,
    };
    res.status(statusCode).json(response);
  }
}

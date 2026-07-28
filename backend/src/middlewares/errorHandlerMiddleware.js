import { env } from "../config/env.config.js";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import { CustomError } from "../utils/custom.error.js";
import { HttpResponseBuilder } from "../utils/response.builder.js";

export function errorHandlerMiddleware(err, req, res, next) {
  void next;
  const statusCode =
    err instanceof CustomError
      ? err.statusCode
      : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  if (env.NODE_ENV === "production") {
    console.log(err.message || MESSAGES.SOMETHING_WENT_WRONG);
  } else {
    console.log(err.message || MESSAGES.SOMETHING_WENT_WRONG);
    console.log(err.stack);
  }
  HttpResponseBuilder.buildErrorResponse(
    req,
    res,
    statusCode,
    err.message || MESSAGES.SOMETHING_WENT_WRONG,
  );
}

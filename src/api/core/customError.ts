import {IErrorResponse, ErrorCode} from '../services/type';

export class CustomError extends Error implements IErrorResponse {
  code: ErrorCode;

  date: Date;

  status: number;

  // @ts-expect-error: expected params
  constructor(status: number, code: ErrorCode, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    // Custom debugging information
    this.code = code;
    this.date = new Date();
    this.status = status;
  }
}

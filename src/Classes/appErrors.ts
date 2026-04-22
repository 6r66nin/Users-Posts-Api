import { errorMap } from "../Utils/databaserrorsMap";
export class AppError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class DatabaseError extends AppError {
  constructor(errcode: number, messagetype: string) {
    const respMap = errorMap[Number(errcode)];

    const httpResp = respMap?.[messagetype];

    if (respMap !== undefined && httpResp !== undefined) {
      super(httpResp.statusCode, httpResp.message);
      return;
    }

    super(400, "internal error");
  }
}

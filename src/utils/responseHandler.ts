import { Response } from "../app.js";

export class ResponseHandler {
  private res: Response;
  private statusCode: number;
  private message: string;
  private status: string;
  private data?: unknown;

  constructor(
    res: Response,
    statusCode: number,
    message: string,
    status: string,
    data?: unknown
  ) {
    this.res = res;
    this.statusCode = statusCode;
    this.message = message;
    this.status = status;
    this.data = data;

    this.sendResponse();
  }

  sendResponse(): void {
    this.res.status(this.statusCode).json({
      message: this.message,
      status: this.status,
      data: this.data || null,
    });
  }
}

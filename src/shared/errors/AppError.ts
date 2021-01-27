export default class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly statusText: string;

  constructor(message: string, statusCode = 200, statusText: string = "GENERIC_ERROR_CODE") {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}

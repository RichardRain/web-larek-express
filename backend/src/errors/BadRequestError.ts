import HttpStatus from '../constants/httpStatus';

export default class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

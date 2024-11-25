import HttpStatus from '../constants/httpStatus';

export default class InternalServerError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

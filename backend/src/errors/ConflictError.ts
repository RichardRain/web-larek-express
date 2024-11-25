import HttpStatus from '../constants/httpStatus';

export default class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatus.CONFLICT;
  }
}

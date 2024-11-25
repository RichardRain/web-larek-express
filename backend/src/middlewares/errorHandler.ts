import { Request, Response, NextFunction } from 'express';
import HttpStatus from '../constants/httpStatus';

const errorHandler = (err: any, _: Request, res: Response, __: NextFunction) => {
  const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message = 'На сервере произошла ошибка' } = err;

  res.status(statusCode).send({ message });
};

export default errorHandler;

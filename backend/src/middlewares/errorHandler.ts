import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _: Request, res: Response, __: NextFunction) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = err;

  res.status(statusCode).send({ message });
};

export default errorHandler;

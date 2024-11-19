import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (
    err instanceof BadRequestError
    || err instanceof NotFoundError
    || err instanceof ConflictError
  ) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  console.error('Необработанная ошибка:', err);

  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};

export default errorHandler;

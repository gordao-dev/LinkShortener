import { NextFunction, Request, Response } from 'express';
import HttpError from '../Errors/HttpError';

export default function ErrorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    error: 'Internal server error',
  });
}

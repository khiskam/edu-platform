import { ClientError } from "@services/utils/client.error";
import { Request, Response, NextFunction } from "express";

type func = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export const errorMiddleware: func = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ClientError) {
    switch (err.code) {
      case 401:
      case 404:
      case 500:
        return res.sendStatus(err.code);
      default:
        if (err.field) {
          if (err.field.length === 1) {
            return res.status(err.code).json({ errors: { [err.field[0]]: err.message } });
          } else {
            return res.status(err.code).json({ message: err.message });
          }
        }
    }
  }

  res.sendStatus(500);
};

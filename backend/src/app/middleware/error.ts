import { Request, Response, NextFunction } from "express";

type func = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export const errorMiddleware: func = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error) {
    console.log(err.message);
  }

  res.sendStatus(500);
};

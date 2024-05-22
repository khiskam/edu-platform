import { DatabaseError } from "@repository/DatabaseError";
import { ClientError } from "@services/error";
import { Request, Response, NextFunction } from "express";

type func = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export const errorMiddleware: func = (err, req, res, next) => {
  if (err instanceof DatabaseError) {
    if (err.type === "client") {
      return res.status(400).json({ errors: { [err.field]: err.message } });
    } else {
      return res.sendStatus(404);
    }
  }

  if (err instanceof ClientError) {
    return res.status(400).json({ errors: { [err.field]: err.message } });
  }

  console.log(err);
  return res.sendStatus(500);
};

import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema, ValidationError } from "yup";

export const validateMiddleware = (schema: ObjectSchema<object>): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (e) {
      if (e instanceof ValidationError) {
        const errors: Record<string, string> = {};

        e.inner.forEach((item) => {
          if (item.path) {
            errors[item.path] = item.message;
          }
        });
        return res.status(400).json({ errors });
      }

      return res.sendStatus(400);
    }
  };
};

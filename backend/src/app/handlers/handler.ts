import {
  NextFunction,
  RequestHandler,
  Router,
  Request,
  Response,
} from "express";

export interface Handler {
  path: string;
  router: Router;
}

export const handleError = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

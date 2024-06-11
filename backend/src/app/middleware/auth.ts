import { app } from "@app/config/auth";
import { prisma } from "@app/config/db";
import { UserRepository } from "@repository/UserRepository";
import { UserService } from "@services/user/UserService";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const tokenMiddleware = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization?.replace("Bearer ", "");

    if (!authHeader) {
      return res.sendStatus(401);
    }

    try {
      const token = await app.auth().verifyIdToken(authHeader);
      res.locals.uid = token.uid;

      return next();
    } catch (e) {
      res.sendStatus(401);
    }
  };
};

export const authMiddleware = (): RequestHandler => {
  const userRepository = new UserRepository(prisma);
  const userService = new UserService(userRepository);

  return async (_: Request, res: Response, next: NextFunction) => {
    const user = await userService.getUserByUid(res.locals.uid);

    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.id = user.id;
    res.locals.role = user.role;
    return next();
  };
};

export const adminMiddleware = (): RequestHandler => {
  return async (_: Request, res: Response, next: NextFunction) => {
    if (res.locals.role !== "admin") {
      return res.sendStatus(403);
    }

    return next();
  };
};

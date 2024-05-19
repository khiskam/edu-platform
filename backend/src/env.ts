import { cleanEnv, port, str } from "envalid";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const ENV = cleanEnv(process.env, {
  API_PORT: port(),
  CLIENT_ORIGIN: str(),
  FIREBASE_PRIVATE_KEY: str(),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_CLIENT_EMAIL: str(),
});

import { PrismaClient } from "@prisma/client";
import { cleanEnv, port, str } from "envalid";

export const prisma = new PrismaClient();

export const ENV = cleanEnv(process.env, {
  API_PORT: port({
    default: 3000,
  }),
  BASE_URL: str(),
  FIREBASE_PRIVATE_KEY: str(),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_CLIENT_EMAIL: str(),
});

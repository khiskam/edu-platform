import { cleanEnv, port, str } from "envalid";
import admin from "firebase-admin";

const config = cleanEnv(process.env, {
  API_PORT: port(),
  CLIENT_ORIGIN: str(),
  FIREBASE_PRIVATE_KEY: str(),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_CLIENT_EMAIL: str(),
});

export const ENV = {
  API_PORT: config.API_PORT,
  CLIENT_ORIGIN: config.CLIENT_ORIGIN,
};

const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert({
    privateKey: config.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    projectId: config.FIREBASE_PROJECT_ID,
    clientEmail: config.FIREBASE_CLIENT_EMAIL,
  }),
};

export const app = admin.initializeApp(firebaseConfig);

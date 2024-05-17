import { cleanEnv, port, str } from "envalid";
import admin from "firebase-admin";
import serviceAccount from "./edu-platform.json";

export const ENV = cleanEnv(process.env, {
  API_PORT: port(),
  CLIENT_ORIGIN: str(),
});

const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert({
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
  }),
};

export const app = admin.initializeApp(firebaseConfig);

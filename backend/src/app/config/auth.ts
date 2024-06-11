import admin from "firebase-admin";

import { ENV } from "../../env";

const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert({
    privateKey: ENV.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    projectId: ENV.FIREBASE_PROJECT_ID,
    clientEmail: ENV.FIREBASE_CLIENT_EMAIL,
  }),
};

export const app = admin.initializeApp(firebaseConfig);

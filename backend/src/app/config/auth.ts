import { ENV } from "../../env";
import admin from "firebase-admin";

const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert({
    privateKey: ENV.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    projectId: ENV.FIREBASE_PROJECT_ID,
    clientEmail: ENV.FIREBASE_CLIENT_EMAIL,
  }),
};

export const app = admin.initializeApp(firebaseConfig);

// TODO название типов
// TODO роуты для админа
// прогресс по одной категории
// прогресс по одной лекции
// прогресс по одному заданию

// загрузка изображения
// удаление изображения
// статический файл

// создание фотографий для урока
// удаление комплитед лессонов и тасков

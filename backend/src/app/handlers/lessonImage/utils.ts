import { LessonImage } from "@domain/lesson";
import { ClientError } from "@services/ClientError";
import { randomUUID } from "crypto";
import multer from "multer";

type LessonImageKeys = keyof LessonImage;

const storage = multer.diskStorage({
  destination: process.env.UPLOAD_FOLDER,
  filename: function (_req, _, cb) {
    cb(null, randomUUID());
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 3 },

  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

const imageTypesList = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");

  for (let i = 0; i < imageTypesList.length; ++i) {
    if (imageTypesList[i] === file.mimetype) {
      if (file.size > 1024 * 1024 * 3) {
        return cb(new ClientError<LessonImageKeys>("Файл не должен весить больше 3Мб", "size"));
      }

      return cb(null, true);
    }
  }

  return cb(
    new ClientError<LessonImageKeys>("Файл должен быть формата изображения", "contentType")
  );
}

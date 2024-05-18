import {
  Category,
  CompletedLesson,
  CompletedTask,
  Lesson,
  PrismaClient,
  Role,
  Task,
} from "@prisma/client";

import { cleanEnv, str } from "envalid";
import admin from "firebase-admin";
import { FirebaseError } from "@firebase/util";
import { v4 as uuidv4 } from "uuid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const config = cleanEnv(process.env, {
  FIREBASE_PRIVATE_KEY: str(),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_CLIENT_EMAIL: str(),
});

const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert({
    privateKey: config.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    projectId: config.FIREBASE_PROJECT_ID,
    clientEmail: config.FIREBASE_CLIENT_EMAIL,
  }),
};

export const app = admin.initializeApp(firebaseConfig);

const users = [
  { id: uuidv4(), email: "admin@mail.ru", password: "adminadmin", role: Role.admin },
  { id: uuidv4(), email: "user@mail.ru", password: "useruser" },
  { id: uuidv4(), email: "anotheruser@mail.ru", password: "anotheruser" },
];

const categories: Category[] = [
  { id: uuidv4(), name: "русский язык" },
  { id: uuidv4(), name: "математика" },
  { id: uuidv4(), name: "география" },
];

const lessons: Lesson[] = [
  {
    id: uuidv4(),
    title: "Местоимения",
    description: "Что такое Местоимения?",
    layout: "<p>Что такое Местоимения?</p>",
    categoryId: categories[0].id,
  },
  {
    id: uuidv4(),
    title: "Параллелепипед",
    description: "Что такое Параллелепипед?",
    layout: "<p>Что такое Параллелепипед?</p>",
    categoryId: categories[1].id,
  },
  {
    id: uuidv4(),
    title: "Причастия",
    description: "Что такое Причастия?",
    layout: "<p>Что такое Причастия?</p>",
    categoryId: categories[0].id,
  },
  {
    id: uuidv4(),
    title: "Деепричастия",
    description: "Что такое Деепричастия?",
    layout: "<p>Что такое Деепричастия?</p>",
    categoryId: categories[0].id,
  },
  {
    id: uuidv4(),
    title: "Республика Коми",
    description: "Что такое Республика Коми?",
    layout: "<p>Что такое Республика Коми?</p>",
    categoryId: categories[2].id,
  },
  {
    id: uuidv4(),
    title: "Республика Татарстан",
    description: "Что такое Республика Татарстан?",
    layout: "<p>Что такое Республика Татарстан?</p>",
    categoryId: categories[2].id,
  },
];

const tasks: Task[] = [
  {
    id: uuidv4(),
    title: "Местоимения",
    description: "Какие из следующих слов являются личными местоимениями?",
    answers: ["он", "она", "оно", "это"],
    correctAnswers: ["он", "она", "оно"],
    lessonId: lessons[0].id,
  },
  {
    id: uuidv4(),
    title: "Местоимения",
    description: "Какое из следующих местоимений является возвратным?",
    answers: ["себя", "его", "их", "нам"],
    correctAnswers: ["себя"],
    lessonId: lessons[0].id,
  },
  {
    id: uuidv4(),
    title: "Местоимения",
    description: "Какие из следующих местоимений являются притяжательными?",
    answers: ["наш", "твой", "кто", "её"],
    correctAnswers: ["наш", "твой", "её"],
    lessonId: lessons[0].id,
  },
  {
    id: uuidv4(),
    title: "Республика Коми",
    description: "Какие из следующих городов находятся в Республике Коми?",
    answers: ["Сыктывкар", "Ухта", "Архангельск", "Воркута"],
    correctAnswers: ["Сыктывкар", "Ухта", "Воркута"],
    lessonId: lessons[4].id,
  },
  {
    id: uuidv4(),
    title: "Республика Коми",
    description: "Какие из следующих природных объектов находятся в Республике Коми?",
    answers: ["Урал", "Печора", "Вуорио", "Ладожское озеро"],
    correctAnswers: ["Печора", "Урал"],
    lessonId: lessons[4].id,
  },
  {
    id: uuidv4(),
    title: "Республика Татарстан",
    description: "Что такое Республика Татарстан?",
    answers: [
      "Параллелепипед — это шестиугольник.",
      "Все углы параллелепипеда прямые",
      "У параллелепипеда 12 рёбер",
      "Параллелепипед имеет 6 граней",
    ],
    correctAnswers: [
      "Все углы параллелепипеда прямые",
      "У параллелепипеда 12 рёбер",
      "Параллелепипед имеет 6 граней",
    ],
    lessonId: lessons[1].id,
  },
];

const completedLessons: CompletedLesson[] = [
  { userId: users[1].id, lessonId: lessons[2].id },
  { userId: users[1].id, lessonId: lessons[4].id },
  { userId: users[2].id, lessonId: lessons[0].id },
  { userId: users[2].id, lessonId: lessons[3].id },
];

const completedTasks: CompletedTask[] = [
  { userId: users[1].id, taskId: tasks[3].id },
  { userId: users[1].id, taskId: tasks[4].id },
  { userId: users[2].id, taskId: tasks[0].id },
  { userId: users[2].id, taskId: tasks[1].id },
];

const createUsersInDB = async (id: string, uid: string, role: Role | undefined) => {
  try {
    await prisma.user.create({ data: { id, uid, role } });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.log(e.code);
    }
  }
};

const createUserInFirebase = async () => {
  for (const item of users) {
    try {
      const user = await admin.auth().getUserByEmail(item.email);
      await createUsersInDB(item.id, user.uid, item.role);
    } catch {
      try {
        const user = await admin.auth().createUser({ email: item.email, password: item.password });
        await createUsersInDB(item.id, user.uid, item.role);
      } catch (e) {
        if (e instanceof FirebaseError) {
          console.log(e.code);
        }
      }
    }
  }
};

const createCategories = async () => {
  for (const item of categories) {
    try {
      await prisma.category.create({ data: item });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
      }
    }
  }
};

const createLessons = async () => {
  for (const item of lessons) {
    try {
      await prisma.lesson.create({ data: item });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
      }
    }
  }
};

const createTasks = async () => {
  for (const item of tasks) {
    try {
      await prisma.task.create({ data: item });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
      }
    }
  }
};

const createCompletedLessons = async () => {
  for (const item of completedLessons) {
    try {
      await prisma.completedLesson.create({ data: item });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
      }
    }
  }
};

const createCompletedTasks = async () => {
  for (const item of completedTasks) {
    try {
      await prisma.completedTask.create({ data: item });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
      }
    }
  }
};

const main = async () => {
  await createUserInFirebase();
  await createCategories();
  await createLessons();
  await createTasks();
  await createCompletedLessons();
  await createCompletedTasks();
};

main();

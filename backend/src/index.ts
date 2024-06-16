import "module-alias/register";

import { App } from "@app/App";
import { CategoryHandler } from "@app/handlers/category/CategoryHandler";
import { HealthCheckHandler } from "@app/handlers/healthCheck/HealthCheckHandler";
import { LessonHandler } from "@app/handlers/lesson/LessonHandler";
import { LessonImageHandler } from "@app/handlers/lessonImage/LessonImageHandler";
import { StatisticsHandler } from "@app/handlers/statistics/StatisticsHandler";
import { TaskHandler } from "@app/handlers/task/TaskHandler";
import { UserHandler } from "@app/handlers/user/UserHandler";

import { ENV } from "./env";

const app = new App(
  ENV.API_PORT ?? 3000,
  new HealthCheckHandler(),
  new StatisticsHandler(),
  new UserHandler(),
  new CategoryHandler(),
  new LessonHandler(),
  new LessonImageHandler(),
  new TaskHandler()
);

app.listen();

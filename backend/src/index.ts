import "module-alias/register";
import { App } from "@app/App";
import { ENV } from "./env";
import { HealthCheckHandler } from "@app/handlers/healthCheck";
import { UserHandler } from "@app/handlers/user";
import { CategoryHandler } from "@app/handlers/category";
import { LessonHandler } from "@app/handlers/lesson";
import { TaskHandler } from "@app/handlers/task";
import { ImageHandler } from "@app/handlers/image";

const app = new App(ENV.API_PORT);

const healthCheckHandler = new HealthCheckHandler();
const userHandler = new UserHandler();
const categoryHandler = new CategoryHandler();
const lessonHandler = new LessonHandler();
const taksHandler = new TaskHandler();
const imageHandler = new ImageHandler();

app.addRoutes(healthCheckHandler, imageHandler);
app.addTokenMiddleware();
app.addRoutes(userHandler);
app.addAuthRoutes(categoryHandler, lessonHandler, taksHandler);
app.addAdminRoutes(categoryHandler, lessonHandler, taksHandler, imageHandler);
app.listen();

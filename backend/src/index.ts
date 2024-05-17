import "module-alias/register";
import { App } from "@app/App";
import { ENV } from "./config";
import { UserHandler } from "@app/handlers/user/handler";
import { CategoryHandler } from "@app/handlers/category/handler";
import { LessonHandler } from "@app/handlers/lesson/handler";
import { TaskHandler } from "@app/handlers/task/handler";

// import { TaskHandler } from "@app/handlers/task/handler";

const app = new App(ENV.API_PORT);
app.addRoutes(new UserHandler());
app.addAuthRoutes(new CategoryHandler(), new LessonHandler(), new TaskHandler());
app.listen();

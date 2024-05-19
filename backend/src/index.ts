import "module-alias/register";
import { App } from "@app/App";
import { ENV } from "./env";
import { HealthCheckHandler } from "@app/handlers/healthCheck";
import { UserHandler } from "@app/handlers/user";
import { CategoryHandler } from "@app/handlers/category";

const app = new App(ENV.API_PORT);

const healthCheckHandler = new HealthCheckHandler();
const userHandler = new UserHandler();
const categoryHandler = new CategoryHandler();

app.addRoutes(healthCheckHandler, userHandler);
app.addAuthRoutes(categoryHandler);
app.addAdminRoutes(categoryHandler);
app.listen();

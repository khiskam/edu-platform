import { Router } from "express";

export interface Path {
  path: string;
}

export interface Handler extends Path {
  initRoutes(): Router;
}

export interface AdminHandler extends Path {
  initAdminRoutes(): Router;
}

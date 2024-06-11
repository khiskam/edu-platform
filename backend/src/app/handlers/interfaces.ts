import { Router } from "express";

export interface Handler {
  path: string;
  getRouter: () => Router;
}

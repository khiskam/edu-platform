import { InferType } from "yup";

import { signInSchema, signUpSchema } from "../validation";
import { Id } from "./id";

export type SignUpData = InferType<typeof signUpSchema>;
export type SignInData = InferType<typeof signInSchema>;

export type UserRole = "user" | "admin";

export type User = Id & { uid: string; role: UserRole };

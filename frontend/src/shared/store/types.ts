export type User = {
  auth?: {
    token: string;
    role: "admin" | "user";
  };
};

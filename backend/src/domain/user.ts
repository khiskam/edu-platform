export type User = {
  id: string;
  role: "user" | "admin";
  uid: string;
};

export type UserKeys = keyof User;

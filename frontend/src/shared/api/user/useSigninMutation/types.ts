export type SigninData = {
  email: string;
  password: string;
};

export type FirebaseSigninData = Pick<SigninData, "email" | "password"> & {
  email: string;
  password: string;
};

export type ServerSigninData = {
  token: string;
};

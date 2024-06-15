export type SignupData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type FirebaseSignupData = Pick<SignupData, "email" | "password"> & {
  email: string;
  password: string;
};

export type ServerSignupData = Pick<SignupData, "firstName" | "lastName"> & {
  token: string;
};

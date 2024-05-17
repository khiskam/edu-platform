import { User } from "@domain/user";
import { CreateUserDTO } from "./dto";

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<User>;
  getByUid(uid: string): Promise<User | null>;
}

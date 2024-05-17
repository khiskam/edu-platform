import { CreateUserDTO } from "@services/user/dto";
import { IUserRepository } from "./interfaces";

export class UserService {
  constructor(private readonly _repo: IUserRepository) {}

  async register(user: CreateUserDTO) {
    return this._repo.create(user);
  }

  async getUserByUid(uid: string) {
    return await this._repo.getByUid(uid);
  }
}

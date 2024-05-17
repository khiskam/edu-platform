import { User, UserKeys } from "@domain/user";
import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "@services/user/dto";
import { IUserRepository } from "@services/user/interfaces";
import { ClientError } from "@services/utils/client.error";
import { PRISMA_CODES } from "./constants";

export class UserRepository implements IUserRepository {
  constructor(private readonly _client: PrismaClient) {}

  async create(user: CreateUserDTO): Promise<User> {
    try {
      return await this._client.user.create({ data: user });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new ClientError<UserKeys>(
            `Пользователь c uid ${user.uid} уже существует`,
            400,
            "uid"
          );
        }
      }

      throw e;
    }
  }

  async getByUid(uid: string): Promise<User | null> {
    return this._client.user.findFirst({ where: { uid } });
  }
}

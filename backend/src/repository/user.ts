import { User, UserKeys } from "@domain/user";
import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "@repository/interfaces";
import { IUserRepository } from "@repository/interfaces";
import { PRISMA_CODES } from "./constants";
import { DatabaseError } from "./DatabaseError";

export class UserRepository implements IUserRepository {
  constructor(private readonly _client: PrismaClient) {}

  async create(user: CreateUserDTO): Promise<User> {
    try {
      return await this._client.user.create({
        data: user,
        select: { id: true, uid: true, role: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new DatabaseError<UserKeys>(
            "Пользователь c таким uid уже существует",
            "client",
            "uid"
          );
        }
      }

      throw e;
    }
  }

  async getByUid(uid: string): Promise<User | null> {
    return this._client.user.findFirst({
      where: { uid },
      select: { id: true, uid: true, role: true },
    });
  }
}

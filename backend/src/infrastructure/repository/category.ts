import { Category, CategoryKeys } from "@domain/category";
import { Prisma, PrismaClient } from "@prisma/client";
import { CategoryDTO, Progress } from "@services/category/dto";
import { ICategoryRepository } from "@services/category/interfaces";
import { ClientError } from "@services/utils/client.error";
import { PRISMA_CODES } from "./constants";

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly _client: PrismaClient) {}
  async count(): Promise<number> {
    return await this._client.category.count();
  }

  async getAll(limit: number, offset: number): Promise<Category[]> {
    return await this._client.category.findMany({ skip: offset, take: limit });
  }

  async getOne(id: string): Promise<Category | null> {
    return await this._client.category.findFirst({ where: { id } });
  }

  async create(category: CategoryDTO): Promise<Category> {
    try {
      return await this._client.category.create({ data: category });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new ClientError<CategoryKeys>("Категория уже существует", 400, "name");
        }
      }

      throw e;
    }
  }

  async update(category: Category): Promise<Category> {
    const { id, name } = category;
    try {
      return await this._client.category.update({ where: { id }, data: { name } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // console.log(e.code, e.message);
        if (e.code === PRISMA_CODES.unique) {
          throw new ClientError<CategoryKeys>("Категория уже существует", 400, "name");
        }
      }

      throw e;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this._client.category.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new ClientError<CategoryKeys>("Категория не найдена", 404, "name");
        }
      }

      throw e;
    }
  }

  async getProgress(userId: string, limit: number, offset: number): Promise<Progress[]> {
    const categories = await this._client.category.findMany({
      skip: offset,
      take: limit,
      include: {
        lessons: {
          select: {
            completedLesson: { where: { userId } },
            task: { select: { completedTask: { where: { userId } } } },
          },
        },
      },
    });

    return categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        completedCount: category.lessons.reduce((acc, lesson) => {
          return (
            acc +
            lesson.completedLesson.length +
            lesson.task.reduce((lessonAcc, task) => {
              return lessonAcc + task.completedTask.length;
            }, 0)
          );
        }, 0),

        totalCount:
          category.lessons.length +
          category.lessons.reduce((acc, lesson) => {
            return acc + lesson.task.length;
          }, 0),
      };
    });
  }
}

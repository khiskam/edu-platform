import { Category } from "@domain/category";
import { CategoryDTO } from "./dto";

export interface ICategoryRepository {
  getAll(limit: number, offset: number): Promise<Category[]>;
  getOne(id: string): Promise<Category | null>;
  create(category: CategoryDTO): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}


import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";
import Category from "../infra/typeorm/entities/Category";

export default interface ICategoriesRepository {
  findAll(user_id: string): Promise<Category[] | undefined>;
  findById(user_id: string, id: string): Promise<Category | undefined>;
  findOne(user_id: string, title: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
  remove(category: Category): Promise<void>;
}

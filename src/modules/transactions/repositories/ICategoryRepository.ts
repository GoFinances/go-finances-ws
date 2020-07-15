
import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";
import Category from "../infra/typeorm/entities/Category";

export default interface ICategoryRepository {
  findById(id: string): Promise<Category | undefined>;
  findOne(title: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}

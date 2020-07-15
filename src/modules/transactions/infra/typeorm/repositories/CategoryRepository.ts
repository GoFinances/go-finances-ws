import { Repository, getRepository } from 'typeorm';

import ICategoriesRepository from '@modules/transactions/repositories/ICategoryRepository'
import ICreateCategoryDTO from '@modules/transactions/dtos/ICreateCategoryDTO';
import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category);
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.repository.findOne(id);
    return category;
  }
  async findOne(title: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({
      where: { title }
    });
    return category;
  }

  async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create(data);
    await this.repository.save(category);
    return category;
  }

  async save(category: Category): Promise<Category> {
    return this.repository.save(category);
  }

}

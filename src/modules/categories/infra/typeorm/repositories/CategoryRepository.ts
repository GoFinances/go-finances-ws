import { Repository, getRepository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import ICreateCategoryDTO from '@modules/transactions/dtos/ICreateCategoryDTO';
import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category);
  }

  async findAll(user_id: string): Promise<Category[] | undefined> {
    const category = await this.repository.find({
      where: { user_id }
    })

    return category;
  }

  async findById(user_id: string, id: string): Promise<Category | undefined> {
    const category = await this.repository.findOne(id, {
      where: { user_id }
    });
    return category;
  }

  async findOne(user_id: string, title: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({
      where: { user_id, title }
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

  async remove(category: Category): Promise<void> {
    await this.repository.remove(category);
  }

}

import { Repository, getRepository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category);
  }

  async findAll(user_id: string): Promise<Category[] | undefined> {
    const category = await this.repository.find({
      select: [
        "id",
        "title",
        "icon",
        "background_color_dark",
        "background_color_light",
      ],
      where: { user_id },
      order: {
        created_at: "DESC"
      }
    })

    return category;
  }

  async findById(user_id: string, id: string): Promise<Category | undefined> {
    const category = await this.repository.findOne(id, {
      select: [
        "id",
        "title",
        "icon",
        "background_color_dark",
        "background_color_light",
      ],
      where: { user_id },
      order: {
        created_at: "DESC"
      }
    });
    return category;
  }

  async findOne(user_id: string, title: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({
      select: [
        "id",
        "title",
        "icon",
        "background_color_dark",
        "background_color_light",
      ],
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

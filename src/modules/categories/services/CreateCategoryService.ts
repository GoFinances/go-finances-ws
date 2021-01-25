import ICategoriesRepository from '../repositories/ICategoriesRepository';

import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  title: string;
  icon: string;
  background_color_dark: string;
  background_color_light: string;
  user_id: string;
}

interface IResponse {
  category: Category
}

@injectable()
class CreateCategoryService {

  constructor(
    @inject("CategoryRepository")
    private repository: ICategoriesRepository
  ) { }

  public async execute({
    title,
    user_id,
    icon,
    background_color_dark,
    background_color_light
  }: IRequest): Promise<Category> {

    const categoryFind = await this.repository.findOne(user_id, title)
    if (Boolean(categoryFind))
      throw new AppError("Essa categoria já existe")

    const category = await this.repository.create({
      title,
      icon,
      background_color_dark,
      background_color_light,
      user_id,
    })

    await this.repository.save(category);
    delete category.user

    return category;
  }
}

export default CreateCategoryService;

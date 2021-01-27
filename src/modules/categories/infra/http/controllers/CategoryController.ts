import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetCategoryService from '@modules/categories/services/GetCategoryService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';

export default class CategoryController {

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const getCategoryService = container.resolve(GetCategoryService);
    var categories = await getCategoryService.execute({ user_id: user_id });

    return response.json({ success: true, result: categories });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, icon, background_color_dark, background_color_light } = request.body;

    const user_id = request.user.id

    const createCategoryService = container.resolve(CreateCategoryService);
    var category = await createCategoryService.execute({ title, icon, background_color_dark, background_color_light, user_id });

    return response.json({ success: true, result: category });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id

    const deleteCategoryService = container.resolve(DeleteCategoryService);
    await deleteCategoryService.execute({ id, user_id });

    return response.json({ success: true })
  }


}

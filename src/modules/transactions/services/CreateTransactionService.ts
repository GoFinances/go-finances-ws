import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';

import ITransactionRepository from '../repositories/ITransactionRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import { inject, injectable } from 'tsyringe';
import Category from '@modules/categories/infra/typeorm/entities/Category';

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome";
  category: string;
  user_id: string;
  dt_reference: number;
}

@injectable()
class CreateTransactionService {

  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository,

    @inject("CategoryRepository")
    private categoryRepository: ICategoriesRepository,

  ) { }


  public async execute({
    title,
    value,
    type,
    category,
    user_id,
    dt_reference
  }: Request): Promise<Transaction> {

    const categoryModel = await this.categoryRepository.findOne(user_id, category)

    var newCategory: Category;
    if (!categoryModel) {
      newCategory = await this.categoryRepository.create({
        user_id,
        title: category,
        background_color_dark: "#FFF",
        background_color_light: "#5636d3",
        icon: "Fa/FaMoneyBillAlt"
      });

      await this.categoryRepository.save(newCategory);
    } else {
      newCategory = categoryModel;
    }

    const transaction = await this.repository.create({
      title,
      value: type === 'outcome' ? value * -1 : value,
      type,
      category_id: newCategory.id,
      user_id,
      dt_reference
    })

    await this.repository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;

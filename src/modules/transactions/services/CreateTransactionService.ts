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
    user_id
  }: Request): Promise<Transaction> {

    const categoryModel = await this.categoryRepository.findOne(category)
    var balance = await this.repository.getBalance(user_id);
    if (value > balance.total && type == "outcome")
      throw new AppError("Não possível fazer uma retirada com o valor solicitado.")

    var newCategory: Category;
    if (!categoryModel) {
      newCategory = await this.categoryRepository.create({ title: category });
      await this.categoryRepository.save(newCategory);
    } else {
      newCategory = categoryModel;
    }

    const transaction = await this.repository.create({
      title,
      value,
      type,
      category_id: newCategory.id,
      user_id
    })

    await this.repository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;

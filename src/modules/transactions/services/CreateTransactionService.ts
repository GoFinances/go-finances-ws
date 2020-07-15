import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';
import Category from '../infra/typeorm/entities/Category';

import ITransactionRepository from '../repositories/ITransactionRepository';
import ICategoryRepository from '../repositories/ICategoryRepository';

import { inject, injectable } from 'tsyringe';

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome";
  category: string;
  user: string;
}

@injectable()
class CreateTransactionService {

  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository,

    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository,

  ) { }

  public async execute({
    title,
    value,
    type,
    category,
    user
  }: Request): Promise<Transaction> {

    const categoryModel = await this.categoryRepository.findOne(category)
    var balance = await this.repository.getBalance();
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
      user_id: user
    })

    await this.repository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;

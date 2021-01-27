import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';

interface Request {
  id: string;
  user_id: string
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject("CategoryRepository")
    private repository: ICategoriesRepository,

    @inject("TransactionRepository")
    private transactionPepository: ITransactionRepository
  ) { }

  public async execute({ id, user_id }: Request): Promise<void> {
    const transactions = await this.transactionPepository.findByCategoryId(id, user_id);

    if (transactions.length)
      throw new AppError("Não é possível excluir uma categoria vinculada a uma transação.")

    const category = await this.repository.findById(user_id, id);
    if (!category)
      throw new AppError("Transação não foi encontrada.")

    await this.repository.remove(category);
  }
}

export default DeleteCategoryService;

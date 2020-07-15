import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import TransactionRepository from '../infra/typeorm/repositories/TransactionRepository';
import ITransactionRepository from '../repositories/ITransactionRepository';

interface Request {
  id: string;
}

@injectable()
class DeleteTransactionService {
  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository
  ) { }

  public async execute({
    id
  }: Request): Promise<void> {
    const transaction = await this.repository.findById(id);

    if (!transaction)
      throw new AppError("Transação não foi encontrada.")

    await this.repository.remove(transaction);
  }
}

export default DeleteTransactionService;

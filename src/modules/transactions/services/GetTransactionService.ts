import Transaction from '../infra/typeorm/entities/Transaction';
import Balance from '../infra/typeorm/entities/Balance';

import ITransactionRepository from '../repositories/ITransactionRepository';

import { inject, injectable } from 'tsyringe';

interface IResponse {
  balance: Balance
  transactions: Transaction[],
  total: number,
}

interface IRequest {
  user_id: string;
  page: number;
  take: number;
}

@injectable()
class GetTransactionService {

  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository
  ) { }

  public async execute({ user_id, take, page }: IRequest): Promise<IResponse> {
    const transactions = await this.repository.findAll(user_id, take, page);
    const balance = await this.repository.getBalance(user_id);

    return {
      ...
      transactions,
      balance
    } as IResponse;
  }
}

export default GetTransactionService;

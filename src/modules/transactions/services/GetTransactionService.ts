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
  filter_category: string;
  filter_type: string;
  dt_init: string;
  dt_end: string;
}

@injectable()
class GetTransactionService {

  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository
  ) { }

  public async execute({ user_id, take, page, filter_category, filter_type, dt_init, dt_end }: IRequest): Promise<IResponse> {
    const transactions = await this.repository.findAll(user_id, take, page, filter_category, filter_type, dt_init, dt_end);
    const balance = await this.repository.getBalance(user_id, filter_category, filter_type, dt_init, dt_end);

    return {
      ...
      transactions,
      balance
    } as IResponse;
  }
}

export default GetTransactionService;

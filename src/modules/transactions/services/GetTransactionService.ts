/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe';
import Transaction from '../infra/typeorm/entities/Transaction';
import Balance from '../infra/typeorm/entities/Balance';

import ITransactionRepository from '../repositories/ITransactionRepository';


interface IResponse {
  balance: Balance;
  transactions: Transaction[];
  total: number;
}

interface IRequest {
  user_id: string;
  page: number;
  take: number;
  category_id: string | null;
  type: string;
  dt_init: number;
  dt_end: number;
}

@injectable()
class GetTransactionService {
  constructor(
    @inject('TransactionRepository')
    private repository: ITransactionRepository,
  ) {}

  public async execute({
    user_id,
    take,
    page,
    category_id = 'all',
    type = 'all',
    dt_init,
    dt_end,
  }: IRequest): Promise<IResponse> {
    const transactions = await this.repository.findAll(
      user_id,
      take,
      page,
      category_id,
      type,
      dt_init,
      dt_end,
    );
    const balance = await this.repository.getBalance(
      user_id,
      category_id,
      type,
      dt_init,
      dt_end,
    );

    return {
      ...transactions,
      balance,
    } as IResponse;
  }
}

export default GetTransactionService;

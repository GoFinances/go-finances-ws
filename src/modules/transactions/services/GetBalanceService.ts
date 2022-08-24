/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe';

import ITransactionRepository from '../repositories/ITransactionRepository';

interface IResponse {
  income: number;
  outcome: number;
  total: number;
}

interface IRequest {
  user_id: string;
  category_id: string | null;
  type: string;
  dt_init: number;
  dt_end: number;
}

@injectable()
class GetBalanceService {
  constructor(
    @inject('TransactionRepository')
    private repository: ITransactionRepository,
  ) {}

  public async execute({
    user_id,
    category_id,
    type = 'all',
    dt_init,
    dt_end,
  }: IRequest): Promise<IResponse> {
    const { income, outcome, total } = await this.repository.getBalance(
      user_id,
      category_id,
      type,
      dt_init,
      dt_end,
    );

    return {
      income,
      outcome,
      total,
    } as IResponse;
  }
}

export default GetBalanceService;

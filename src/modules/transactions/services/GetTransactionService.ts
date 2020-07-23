import Transaction from '../infra/typeorm/entities/Transaction';
import Balance from '../infra/typeorm/entities/Balance';

import ITransactionRepository from '../repositories/ITransactionRepository';

import { inject, injectable } from 'tsyringe';

interface IResponse {
  transactions: Transaction[],
  balance: Balance
}

interface IRequest {
  user_id: string;
}

@injectable()
class GetTransactionService {

  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository
  ) { }

  public async execute({ user_id }: IRequest): Promise<IResponse> {
    var transactions = await this.repository.findAll(user_id);
    var balance = await this.repository.getBalance(user_id);

    return {
      transactions,
      balance
    } as IResponse

  }
}

export default GetTransactionService;

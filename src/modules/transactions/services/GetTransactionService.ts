import Transaction from '../infra/typeorm/entities/Transaction';
import Balance from '../infra/typeorm/entities/Balance';

import ITransactionRepository from '../repositories/ITransactionRepository';

import { inject, injectable } from 'tsyringe';

interface IResponse {
  transactions: Transaction[],
  balance: Balance
}

@injectable()
class GetTransactionService {

  constructor(
    @inject("TransactionRepository")
    private repository: ITransactionRepository
  ) { }

  public async execute(): Promise<IResponse> {
    var transactions = await this.repository.findAll();
    var balance = await this.repository.getBalance();

    return {
      transactions,
      balance
    } as IResponse

  }
}

export default GetTransactionService;

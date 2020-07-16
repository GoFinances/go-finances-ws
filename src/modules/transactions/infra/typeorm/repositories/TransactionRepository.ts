import { EntityRepository, Repository, getRepository } from 'typeorm';

import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import Transaction from '../entities/Transaction';
import Balance from '../entities/Balance';


@EntityRepository(Transaction)
class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>

  constructor() {
    this.repository = getRepository(Transaction);
  }

  public async getBalance(): Promise<Balance> {
    var transactions = await this.repository.find()

    const income = transactions
      .filter(transaction => transaction.type == "income")
      .reduce((total, transaction) => Number(transaction.value) + Number(total), 0);

    const outcome = transactions
      .filter(transaction => transaction.type == "outcome")
      .reduce((total, transaction) => Number(transaction.value) + Number(total), 0);

    return {
      income: Number(income),
      outcome: Number(outcome),
      total: (income - outcome)
    }
  }

  async findAll(): Promise<Transaction[] | undefined> {
    const transactions = await this.repository.find({
      select: [
        "id",
        "title",
        "type",
        "value",
        "category_id",
        "category",
        "created_at"
      ],
      relations: ["category"]
    });
    return transactions;
  }

  async findById(id: string): Promise<Transaction | undefined> {
    const transaction = await this.repository.findOne(id);
    return transaction;
  }

  async findOne(email: string): Promise<Transaction | undefined> {
    const transaction = await this.repository.findOne({
      where: { email }
    });
    return transaction;
  }

  async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.repository.create(data);
    await this.repository.save(transaction);
    return transaction;
  }

  async save(transaction: Transaction): Promise<Transaction> {
    return await this.repository.save(transaction);
  }

  async remove(transaction: Transaction): Promise<void> {
    await this.repository.remove(transaction);
  }
}

export default TransactionRepository;


import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import Transaction from "../infra/typeorm/entities/Transaction";
import Balance from "../infra/typeorm/entities/Balance";

export default interface ITransactionRepository {
  findAll(id: string, take: number, page: number, category_id: string, type: string, dt_init: number, dt_end: number): Promise<{ transactions: Transaction[], total: number } | undefined>;
  findById(id: string, user_id: string): Promise<Transaction | undefined>;
  findByCategoryId(category_id: string, user_id: string): Promise<Transaction[] | undefined>;
  findOne(email: string, user_id: string): Promise<Transaction | undefined>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  save(transaction: Transaction): Promise<Transaction>;
  getBalance(user_id: string, category_id: string, type: string, dt_init: number, dt_end: number): Promise<Balance>;
  remove(transaction: Transaction): Promise<void>;
}

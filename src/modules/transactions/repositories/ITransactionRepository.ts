
import ICreateTransactionDTO from "../dtos/ICreateTransactionDTO";
import Transaction from "../infra/typeorm/entities/Transaction";
import Balance from "../infra/typeorm/entities/Balance";

export default interface ITransactionRepository {
  findAll(id: string): Promise<Transaction[] | undefined>;
  findById(id: string, user_id: string): Promise<Transaction | undefined>;
  findOne(email: string, user_id: string): Promise<Transaction | undefined>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  save(transaction: Transaction): Promise<Transaction>;
  getBalance(user_id: string): Promise<Balance>;
  remove(transaction: Transaction): Promise<void>;
}

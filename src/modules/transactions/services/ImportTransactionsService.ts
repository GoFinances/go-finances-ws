import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { container, injectable, inject } from 'tsyringe';


import uploadConfig from '@config/upload';
import Transaction from '../infra/typeorm/entities/Transaction';
import CreateTransactionService from './CreateTransactionService';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface Request {
  filename: string;
  user_id: string;
}

@injectable()
class ImportTransactionsService {

  constructor(
    @inject("StorageProvider")
    private storageProvide: IStorageProvider

  ) { }

  async execute({
    filename,
    user_id
  }: Request): Promise<Transaction[]> {
    const createTransactionService = container.resolve(CreateTransactionService);

    const filePath = path.join(uploadConfig.directory, filename);
    const csvJson = await csv().fromFile(filePath);

    await fs.promises.unlink(filePath);
    const transactions: Transaction[] = [];

    for (const item of csvJson) {
      const { title, type, value, category, dt_reference } = item;
      const transaction = await createTransactionService.execute({ title, value: parseFloat(value), type, category, user_id , dt_reference });
      transactions.push(transaction);
    }

    return transactions;

  }
}

export default ImportTransactionsService;

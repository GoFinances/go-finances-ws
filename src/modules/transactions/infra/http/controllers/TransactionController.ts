import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from "@modules/transactions/services/CreateTransactionService";
import DeleteTransactionService from "@modules/transactions/services/DeleteTransactionService";
import ImportTransactionsService from '@modules/transactions/services/ImportTransactionsService';
import GetTransactionService from '@modules/transactions/services/GetTransactionService';

export default class TransactionController {

  public async index(request: Request, response: Response): Promise<Response> {
    const getTransactionService = container.resolve(GetTransactionService);
    var transactions = await getTransactionService.execute();

    return response.json(transactions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value, type, category } = request.body;
    const user_id = request.user.id

    const createTransactionService = container.resolve(CreateTransactionService);
    await createTransactionService.execute({ title, value, type, category, user_id });

    return response.json({ value, type, category, user_id });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteTransactionService = container.resolve(DeleteTransactionService);
    await deleteTransactionService.execute({ id });

    return response
      .status(204)
      .json()
  }

  public async import(request: Request, response: Response): Promise<Response> {
    const importTransactionsService = container.resolve(ImportTransactionsService);
    const user_id = request.user.id

    var transactions = await importTransactionsService.execute({ filename: request.file.filename, user_id });
    return response.json(transactions)
  }


}

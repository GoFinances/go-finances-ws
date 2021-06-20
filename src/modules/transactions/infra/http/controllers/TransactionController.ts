import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from "@modules/transactions/services/CreateTransactionService";
import DeleteTransactionService from "@modules/transactions/services/DeleteTransactionService";
import ImportTransactionsService from '@modules/transactions/services/ImportTransactionsService';
import GetTransactionService from '@modules/transactions/services/GetTransactionService';

export default class TransactionController {

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      take,
      page,
      category_id,
      type,
      dt_init,
      dt_end
    } = request.query;

    const user_id = request.user.id;
    const getTransactionService = container.resolve(GetTransactionService);
    const transactions = await getTransactionService.execute({
      user_id,
      take: Number(take),
      page: Number(page),
      category_id: String(category_id),
      type: String(type),
      dt_init: Number(dt_init),
      dt_end: Number(dt_end)
    });

    return response.json({
      success: true,
      result: transactions,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value, type, category } = request.body;
    const user_id = request.user.id

    const createTransactionService = container.resolve(CreateTransactionService);
    await createTransactionService.execute({ title, value, type, category, user_id });

    return response.json({ success: true, result: { value, type, category } });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id

    const deleteTransactionService = container.resolve(DeleteTransactionService);
    await deleteTransactionService.execute({ id, user_id: user_id });

    return response
      .json({ success: true })
  }

  public async import(request: Request, response: Response): Promise<Response> {
    const importTransactionsService = container.resolve(ImportTransactionsService);
    const user_id = request.user.id

    var transactions = await importTransactionsService.execute({ filename: request.file.filename, user_id });
    return response.json({
      success: true,
      result: transactions
    })
  }


}

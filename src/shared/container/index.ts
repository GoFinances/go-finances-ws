import { container } from 'tsyringe';


import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITransactionRepository from '@modules/transactions/repositories/ITransactionRepository';
import TransactionRepository from '@modules/transactions/infra/typeorm/repositories/TransactionRepository';

import ICategoryRepository from '@modules/transactions/repositories/ICategoryRepository';
import CategoryRepository from '@modules/transactions/infra/typeorm/repositories/CategoryRepository';




container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository
)

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
)

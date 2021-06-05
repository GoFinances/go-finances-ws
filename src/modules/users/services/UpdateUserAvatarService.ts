import path from 'path';
import fs from 'fs'


import uploadConfig from '@config/upload';
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '@shared/container/providers/storage/IStorageProvider';


interface Request {
  user_id: string;
  avatar_filename: string
}

@injectable()
export default class UpdateUserAvatarService {

  constructor(
    @inject("UsersRepository")
    private repository: IUserRepository,

    @inject("StorageProvider")
    private storageProvide: IStorageProvider

  ) { }

  public async execute({ user_id, avatar_filename }: Request): Promise<User> {

    const user = await this.repository.findById(user_id);
    if (!user)
      throw new AppError("Apenas usuários autenticados podem alterar o avatar.");



    if (user.avatar) {
      this.storageProvide.delete(user.avatar, "avatar");
    }

    this.storageProvide.save(avatar_filename, "avatar");

    user.avatar = avatar_filename;
    await this.repository.save(user);

    return user;
  }
}

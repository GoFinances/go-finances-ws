import { IStorageProvider } from "../IStorageProvider";

import fs from 'fs';
import { resolve } from 'path';

import upload from "@config/upload";

class LocalStorageProvider implements IStorageProvider {

  async save(file: string, folder: string): Promise<String> {
    await fs.promises.rename(
      resolve(upload.directory, file),
      resolve(`${upload.directory}/${folder}`, file)
    )
    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.directory}/${folder}`, file);
    try {
      await fs.promises.stat(filename);
    } catch{
      return
    }
    await fs.promises.unlink(filename);
  }


}

export { LocalStorageProvider }

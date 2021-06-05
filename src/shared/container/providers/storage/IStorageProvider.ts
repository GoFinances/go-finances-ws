interface IStorageProvider {
  save(file: string, folder: string): Promise<String>;
  delete(file: string, folder: string): Promise<void>;
}


export { IStorageProvider };

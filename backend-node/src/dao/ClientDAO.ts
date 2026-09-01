import { AppDataSource } from '../data-source';
import { Client } from '../entity/Client';

export class ClientDAO {
  private repo = AppDataSource.getRepository(Client);

  async findById(id: number, relations: string[] = []): Promise<Client | null> {
    return this.repo.findOne({
      where: { id },
      relations,
    });
  }
}
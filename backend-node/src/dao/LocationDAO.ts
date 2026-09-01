import { AppDataSource } from "../data-source";
import { Location } from "../entity/Location";

export class LocationDAO {
  private repository = AppDataSource.getRepository(Location);

  async save(location: Location): Promise<Location> {
    return this.repository.save(location);
  }

  async findActiveLocationsByClient(idClient: number): Promise<Location[]> {
    return this.repository.find({
      where: {
        client: { id: idClient },
        statut: "EN_COURS",
      },
      relations: ["client"],
    });
  }
}

import { AppDataSource } from "../data-source";
import { CopieFilm } from "../entity/CopieFilm";

export class CopieFilmDAO {
  private repository = AppDataSource.getRepository(CopieFilm);

  
  async findAvailableCopyByFilm(idFilm: number): Promise<CopieFilm | null> {
    return this.repository.findOne({
      where: {
        film: { id: idFilm },
        etat: "DISPONIBLE",
      },
      relations: ["film"],
    });
  }

 
  async save(copieFilm: CopieFilm): Promise<CopieFilm> {
    return this.repository.save(copieFilm);
  }

  
  async findAllCopiesByFilm(idFilm: number): Promise<CopieFilm[]> {
    return this.repository.find({
      where: { film: { id: idFilm } },
    });
  }

  
  async countAvailableCopies(idFilm: number): Promise<number> {
    const copies = await this.repository.count({
      where: {
        film: { id: idFilm },
        etat: "DISPONIBLE",
      },
    });
    return copies;
  }
}

import { AppDataSource } from "../data-source";
import { Film } from "../entity/Film";
import { Personne } from "../entity/Personne";
import { ILike, In, Brackets } from "typeorm";

export class PersonneDAO {
  private repository = AppDataSource.getRepository(Personne);

  async findById(id: number): Promise<Personne | null> {
    return this.repository.findOne({
      where: { idPersonne: id },
      relations: [
        "participations",
        "participations.film",
      ],
    });
  }

  async searchByParams(params: Record<string, any>): Promise<Personne[]> {
    const qb = this.repository.createQueryBuilder("f");

    qb.leftJoinAndSelect("f.genres", "g")
      .leftJoinAndSelect("f.paysProduction", "p")
      .leftJoinAndSelect("f.participations", "participation")
      .leftJoinAndSelect("participation.personne", "personne")

    if (params.nom) {
      const motsNom = params.nom.toString().split(' ').filter((mot: string) => mot.length > 0);
      motsNom.forEach((mot: string, index: number) => {
        qb.andWhere(`LOWER(personne.nom) LIKE LOWER(:motNom${index})`, { [`motNom${index}`]: `%${mot}%` });
      });
    }

    if (params.prenom) {
      const motsPrenom = params.prenom.toString().split(' ').filter((mot: string) => mot.length > 0);
      motsPrenom.forEach((mot: string, index: number) => {
        qb.andWhere(`LOWER(personne.prenom) LIKE LOWER(:motPrenom${index})`, { [`motPrenom${index}`]: `%${mot}%` });
      });
    }

    if (params.biographie) {
      qb.andWhere("LOWER(personne.biographie) LIKE LOWER(:biographie)", {
        biographie: `%${params.biographie}%`,
      });
    }
    if (params.dateNaissance) {
      qb.andWhere("LOWER(personne.dateNaissance) LIKE LOWER(:dateNaissance)", {
        dateNaissance: `%${params.dateNaissance}%`,
      });
    }

    if (params.lieuNaissance) {
      qb.andWhere("LOWER(personne.lieuNaissance) LIKE LOWER(:lieuNaissance)", {
        lieuNaissance: `%${params.lieuNaissance}%`,
      });
    }
    
    return qb.getMany();
  }

  async findAll(): Promise<Personne[]> {
    try {
      const personnes = await this.repository.find({
        relations: ["films", "films.genres", "films.paysProduction", "films.participations", "films.participations.personne"],
      });
      console.log(`PersonneDAO.findAll: Found ${personnes.length} personnes.`);
      return personnes;
    } catch (error) {
      console.error("PersonneDAO.findAll: Error fetching personnes:", error);
      throw error;
    }
  }
}

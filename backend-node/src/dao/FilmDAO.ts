import { AppDataSource } from "../data-source";
import { Film } from "../entity/Film";
import { ILike, In, Brackets } from "typeorm";

export class FilmDAO {
  private repository = AppDataSource.getRepository(Film);

  async findById(id: number): Promise<Film | null> {
    return this.repository.findOne({
      where: { id: id },
      relations: [
        "genres",
        "paysProduction",
        "participations",
        "participations.personne",
        "bandeAnnonces",
      ],
    });
  }

  // Nouvelle méthode pour charger les détails complets d'un film
  async findByIdWithDetails(id: number): Promise<Film | null> {
    console.time(`findByIdWithDetails-${id}`);
    const film = await this.repository.findOne({
      where: { id: id },
      relations: [
        "genres",
        "paysProduction",
        "participations",
        "participations.personne",
        "bandeAnnonces",
      ],
    });
    console.timeEnd(`findByIdWithDetails-${id}`);
    return film;
  }

  async searchByParams(params: Record<string, any>): Promise<Film[]> {
    console.log("FilmDAO.searchByParams - Params reçus:", params);
    
    // Si aucun filtre n'est vraiment rempli, utiliser findAll
    const hasFilters = Object.values(params).some(value => 
      value !== null && value !== undefined && value !== ''
    );
    
    if (!hasFilters) {
      console.log("Aucun filtre - utilisation de findAll");
      return this.findAll();
    }
    
    const qb = this.repository.createQueryBuilder("f");
    this.addBasicJoins(qb, params);
    this.addFilters(qb, params);

    const results = await qb.getMany();
    console.log(`FilmDAO.searchByParams - Films trouvés: ${results.length}`);
    return results;
  }

  // private addBasicJoins(qb: any, params: Record<string, any>): void {
  //   // Jointures SEULEMENT pour l'affichage de base (genres, pays)
  //   qb.leftJoinAndSelect("f.genres", "g")
  //     .leftJoinAndSelect("f.paysProduction", "p");
    
  //   // Jointures pour participations SEULEMENT si on filtre par acteur/réalisateur
  //   if (params.acteur || params.realisateur) {
  //     qb.leftJoin("f.participations", "participation")
  //       .leftJoin("participation.personne", "personne");
  //   }
  // }
  private addBasicJoins(qb: any, params: Record<string, any>): void {
    // Jointures pour l'affichage de base (genres, pays, participations)
    qb.leftJoinAndSelect("f.genres", "g")
      .leftJoinAndSelect("f.paysProduction", "p")
      .leftJoinAndSelect("f.participations", "participation")
      .leftJoinAndSelect("participation.personne", "personne")
      .leftJoinAndSelect("f.bandeAnnonces", "ba");
  }


  private addFilters(qb: any, params: Record<string, any>): void {
    this.addTitleFilter(qb, params.titre);
    this.addYearFilters(qb, params.anneeMin, params.anneeMax);
    this.addGenreFilter(qb, params.genre);
    this.addCountryFilter(qb, params.pays);
    this.addPersonFilters(qb, params.acteur, params.realisateur);
    this.addLanguageFilter(qb, params.langueOriginale);
  }

  private addTitleFilter(qb: any, titre: any): void {
    if (titre) {
      const motsTitre = titre.toString().split(' ').filter((mot: string) => mot.length > 0);
      for (let index = 0; index < motsTitre.length; index++) {
        const mot = motsTitre[index];
        qb.andWhere(`LOWER(f.titre) LIKE LOWER(:motTitre${index})`, { [`motTitre${index}`]: `%${mot}%` });
      }
    }
  }

  private addYearFilters(qb: any, anneeMin: any, anneeMax: any): void {
    if (anneeMin) {
      qb.andWhere("f.anneeSortie >= :anneeMin", { anneeMin: Number(anneeMin) });
    }
    if (anneeMax) {
      qb.andWhere("f.anneeSortie <= :anneeMax", { anneeMax: Number(anneeMax) });
    }
  }

  private addGenreFilter(qb: any, genre: any): void {
    if (genre) {
      const genreClean = genre.toString().trim();
      if (genreClean) {
        qb.andWhere("UPPER(g.nomGenre) LIKE UPPER(:genre)", { genre: `%${genreClean}%` });
      }
    }
  }

  private addCountryFilter(qb: any, pays: any): void {
    if (pays) {
      const paysClean = pays.toString().trim();
      if (paysClean) {
        qb.andWhere("UPPER(p.nomPays) LIKE UPPER(:pays)", { pays: `%${paysClean}%` });
      }
    }
  }

  private addPersonFilters(qb: any, acteur: any, realisateur: any): void {
    if (acteur) {
      const parts = acteur.toString().trim().split(/\s+/);
      for (let i = 0; i < parts.length; i++) {
        qb.andWhere(`UPPER(personne.PRENOM || ' ' || personne.NOM) LIKE UPPER(:act${i})`, { [`act${i}`]: `%${parts[i]}%` });
      }
      qb.andWhere("participation.ROLE = 'ACTEUR'");
    }

    if (realisateur) {
      const parts = realisateur.toString().trim().split(/\s+/);
      for (let i = 0; i < parts.length; i++) {
        qb.andWhere(`UPPER(personne.PRENOM || ' ' || personne.NOM) LIKE UPPER(:real${i})`, { [`real${i}`]: `%${parts[i]}%` });
      }
      qb.andWhere("participation.ROLE = 'REALISATEUR'");
    }
  }

  private addLanguageFilter(qb: any, langueOriginale: any): void {
    if (langueOriginale) {
      qb.andWhere("LOWER(f.langueOriginale) LIKE LOWER(:langueOriginale)", {
        langueOriginale: `%${langueOriginale}%`,
      });
    }
  }

  async findAll(): Promise<Film[]> {
    return this.repository.find({
      relations: [
        "genres", 
        "paysProduction",
        "participations",
        "participations.personne",
        "bandeAnnonces",
      ],
    });
  }
}

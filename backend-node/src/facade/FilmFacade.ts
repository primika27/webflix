import { FilmDAO } from "../dao/FilmDAO";
import { Film } from "../entity/Film";
import { CopieFilmDAO } from "../dao/CopieFilmDAO";

export class FilmFacade {
  private dao = new FilmDAO();
  private copieFilmDAO = new CopieFilmDAO();

  async getAllFilms(): Promise<Film[]> {
    return this.dao.findAll();
  }

  async getFilmById(id: number): Promise<Film | null> {
    return this.dao.findById (id);
  }

  async searchFilms(params: Record<string, any>): Promise<Film[]> {
    try {
      if (Object.keys(params).length === 0) {
        const films = await this.dao.findAll();
        console.log(`FilmFacade.searchFilms: Returning ${films.length} films from findAll.`);
        return films;
      }
      const films = await this.dao.searchByParams(params);
      console.log(`FilmFacade.searchFilms: Returning ${films.length} films from searchByParams.`);
      return films;
    } catch (error) {
      console.error("FilmFacade.searchFilms: Error in searchFilms:", error);
      throw error;
    }
  }

  async getCountAvailableCopies(idFilm: number): Promise<number> {
    return this.copieFilmDAO.countAvailableCopies(idFilm);
  }
}

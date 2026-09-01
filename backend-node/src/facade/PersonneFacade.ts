import { PersonneDAO } from "../dao/PersonneDAO";
import { Personne } from "../entity/Personne";

export class PersonneFacade {
  private dao = new PersonneDAO();

  async getAllPersonnes(): Promise<Personne[]> {
    return this.dao.findAll();
  }

  async getPersonneById(id: number): Promise<Personne | null> {
    return this.dao.findById(id);
  }

  async searchPersonnes(params: Record<string, any>): Promise<Personne[]> {
    try {
      if (Object.keys(params).length === 0) {
        const personnes = await this.dao.findAll();
        console.log(`PersonneFacade.searchPersonnes: Returning ${personnes.length} personnes from findAll.`);
        return personnes;
      }
      const personnes = await this.dao.searchByParams(params);
      console.log(`PersonneFacade.searchPersonnes: Returning ${personnes.length} personnes from searchByParams.`);
      return personnes;
    } catch (error) {
      console.error("PersonneFacade.searchPersonnes: Error in searchPersonnes:", error);
      throw error;
    }
  }
}

import { ClientDAO } from "../dao/ClientDAO";
import { CopieFilmDAO } from "../dao/CopieFilmDAO";
import { LocationDAO } from "../dao/LocationDAO";
import { Location } from "../entity/Location";

export class LocationFacade {
  private clientDAO = new ClientDAO();
  private copieDAO = new CopieFilmDAO();
  private locationDAO = new LocationDAO();

  async rentFilm(idClient: number, idFilm: number) {
    try {
      
      const client = await this.clientDAO.findById(idClient, ["forfait", "locations"]);
      if (!client) {
        return { success: false, message: "Client introuvable." };
      }

      //  Vérifier le nombre de locations actives
      const activeLocations = client.locations.filter(l => l.statut === "EN_COURS");
      if (activeLocations.length >= client.forfait.locationsMax) {
        return { success: false, message: "Limite de locations atteinte pour ce forfait." };
      }

      // Trouver une copie disponible pour ce film
      const copieDisponible = await this.copieDAO.findAvailableCopyByFilm(idFilm);
      if (!copieDisponible) {
        return { success: false, message: "Aucune copie disponible pour ce film." };
      }

      // Créeation de la nouvelle location
      const location = new Location();
      location.client = client;
      location.copieFilm = copieDisponible;
      location.dateLocation = new Date();

      const dureeMax = client.forfait.dureeMaxJours || 30;
      const dateRetour = new Date();
      dateRetour.setDate(dateRetour.getDate() + dureeMax);
      location.dateRetourPrevue = dateRetour;

      location.dateRetourReelle = null;
      location.statut = "EN_COURS";

      
      await this.locationDAO.save(location);

     
      copieDisponible.etat = "LOUEE";
      await this.copieDAO.save(copieDisponible);

      
      return {
        success: true,
        message: "Film loué avec succès.",
        codeCopie: copieDisponible.codeCopie,
        dateRetourPrevue: dateRetour.toISOString().split("T")[0],
      };

    } catch (error) {
      console.error("Erreur lors de la location :", error);
      return { success: false, message: "Erreur interne du serveur." };
    }
  }
}

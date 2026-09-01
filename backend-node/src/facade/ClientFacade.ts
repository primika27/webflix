import { ClientDAO } from "../dao/ClientDAO";
import { LocationDAO } from "../dao/LocationDAO";

export class ClientFacade {
  private clientDAO = new ClientDAO();
  private locationDAO = new LocationDAO();

  async getClientWithForfait(idClient: number){
    const client = await this.clientDAO.findById(idClient, ["forfait"]);
    console.log("dans facade client : ",client);
    
    if(!client) throw new Error("Client introuvable");

    return client.forfait
  }
  
  async getClientLocation(idClient: number){
    return await this.locationDAO.findActiveLocationsByClient(idClient);
  }
}



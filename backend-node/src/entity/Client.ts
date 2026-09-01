import { Entity, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Utilisateur } from "./Utilisateur";
import { Forfait } from "./Forfait";
import { Location } from "./Location";

@Entity({ name: "CLIENT" })
export class Client {
  @PrimaryColumn({ name: "ID_CLIENT" })
  id!: number;

  // Relation 1:1 avec UTILISATEUR (même clé)
  @OneToOne(() => Utilisateur, { eager: true })
  @JoinColumn({ name: "ID_CLIENT" })
  utilisateur!: Utilisateur;

  // Relation N:1 avec FORFAIT (chaque client a un seul forfait)
  @ManyToOne(() => Forfait, (forfait) => forfait.clients, { eager: true })
  @JoinColumn({ name: "ID_FORFAIT" })
  forfait!: Forfait;

  // Relation 1:N avec LOCATION (un client peut avoir plusieurs locations)
  @OneToMany(() => Location, (location) => location.client)
  locations!: Location[];
}
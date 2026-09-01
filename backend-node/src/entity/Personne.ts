import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm";
import { Participation } from "./Participation";

@Entity("PERSONNE")
export class Personne {
  @PrimaryGeneratedColumn({ name: "ID_PERSONNE" })
  idPersonne!: number;

  @Index()
  @Column({ name: "PRENOM" })
  prenom!: string;

  @Index()
  @Column({ name: "NOM" })
  nom!: string;

  @Column({ name: "DATENAISSANCE", type: "date", nullable: true })
  dateNaissance?: Date;

  @Column({ name: "LIEUNAISSANCE", nullable: true })
  lieuNaissance?: string;

  @Column({ name: "PHOTOURL", nullable: true })
  photoURL?: string;

  @Column({ name: "BIOGRAPHIE", type: "clob", nullable: true })
  biographie?: string;

  @OneToMany(() => Participation, (participation) => participation.personne)
  participations!: Participation[];
}

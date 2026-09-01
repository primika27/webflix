import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "UTILISATEUR" })
export class Utilisateur {
  @PrimaryGeneratedColumn({ name: "ID_UTILISATEUR" })
  id!: number;

  @Column({ name: "COURRIEL" })
  courriel!: string;

  @Column({ name: "MOTDEPASSE" })
  motDePasse!: string;

  @Column({ name: "PRENOM" })
  prenom!: string;

  @Column({ name: "NOM" })
  nom!: string;

  @Column({ name: "TELEPHONE", nullable: true })
  telephone!: string;

  @Column({ name: "DATE_NAISSANCE", type: "date", nullable: true })
  dateNaissance!: Date;

  @Column({ name: "ID_ADRESSE", nullable: true })
  idAdresse!: number;
}

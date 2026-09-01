import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, Index } from "typeorm";
import { Film } from "./Film";

@Entity("PAYS")
export class Pays {
  @PrimaryGeneratedColumn({ name: "ID_PAYS" })
  idPays!: number;  

  @Index()
  @Column({ name: "NOM" })
  nomPays!: string;


  @ManyToMany(() => Film, (film) => film.paysProduction)
  films!: Film[];
}

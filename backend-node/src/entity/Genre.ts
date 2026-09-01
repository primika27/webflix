import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Index } from "typeorm";
import { Film } from "./Film";


@Entity({ name: "GENRE" })
export class Genre {
  @PrimaryGeneratedColumn({ name: "ID_GENRE" })
  idGenre!: number;

  @Index()
  @Column({ name: "NOM" })
  nomGenre!: string;

  @ManyToMany(() => Film, (film) => film.genres)
  films!: Film[];

}

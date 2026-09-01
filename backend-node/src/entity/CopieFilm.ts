import {Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Film } from "./Film";
import { Location } from "./Location";

@Entity({ name: "COPIEFILM" })
export class CopieFilm {
  @PrimaryColumn({ name: "CODECOPIE" })
  codeCopie!: string;

  @Column({ name: "ETAT" })
  etat!: string;

  @ManyToOne(() => Film, (film) => film.copies, { eager: true })
  @JoinColumn({ name: "ID_FILM" })
  film!: Film;

  @OneToMany(() => Location, (location) => location.copieFilm)
  locations!: Location[];
}

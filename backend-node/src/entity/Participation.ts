import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { Film } from "./Film";
import { Personne } from "./Personne";

@Entity("PARTICIPATION")
export class Participation {
  @PrimaryGeneratedColumn({ name: "ID_PARTICIPATION" })
  idParticipation!: number;

  @Index()
  @Column({ name: "ROLE" })
  role!: string; // 'ACTEUR', 'REALISATEUR', 'SCENARISTE'

  @Index()
  @Column({ name: "PERSONNAGE", nullable: true })
  personnage?: string;

  @Index()
  @ManyToOne(() => Film, (film) => film.participations)
  @JoinColumn({ name: "ID_FILM" })
  film!: Film;

  @Index()
  @ManyToOne(() => Personne, (personne) => personne.participations)
  @JoinColumn({ name: "ID_PERSONNE" })
  personne!: Personne;
}

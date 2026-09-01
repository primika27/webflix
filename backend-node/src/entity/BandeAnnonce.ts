import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { Film } from "./Film";

@Entity("BANDEANNONCE")
export class BandeAnnonce {
  @PrimaryGeneratedColumn({ name: "ID_BA" })
  idBa!: number;

  @Index()
  @Column({ name: "URL" })
  url!: string;

  @Index()
  @ManyToOne(() => Film, (film) => film.bandeAnnonces)
  @JoinColumn({ name: "ID_FILM" })
  film!: Film;
}
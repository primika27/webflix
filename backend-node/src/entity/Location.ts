import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Client } from "./Client";
import { CopieFilm } from "./CopieFilm";

@Entity({ name: "LOCATION" })
export class Location {
  @PrimaryGeneratedColumn({ name: "ID_LOCATION" })
  id!: number;

  @Column({ name: "DATELOCATION", type: "date" })
  dateLocation!: Date;

  @Column({ name: "DATERETOURPREVUE", type: "date" })
  dateRetourPrevue!: Date;

  @Column({ name: "DATERETOURREELLE", type: "date", nullable: true })
  dateRetourReelle!: Date | null;

  @Column({ name: "STATUT", type: "varchar2", nullable: true })
  statut!: string | null;

  @ManyToOne(() => Client, (client) => client.locations, { eager: true })
  @JoinColumn({ name: "ID_CLIENT" })
  client!: Client;

  @ManyToOne(() => CopieFilm, (copieFilm) => copieFilm.locations, { eager: true })
  @JoinColumn({ name: "CODECOPIE" })
  copieFilm!: CopieFilm;
}

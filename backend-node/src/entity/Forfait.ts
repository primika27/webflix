import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Client } from "./Client";


@Entity({ name: "FORFAIT" })
export class Forfait {
  @PrimaryColumn({ name: "CODE" })
  code!: string;

  @Column({ name: "NOM" })
  nom!: string;

  @Column({ name: "COUTMENSUEL" })
  coutMensuel!: number;

  @Column({ name: "LOCATIONSMAX" })
  locationsMax!: number;

  @Column({ name: "DUREEMAXJOURS" })
  dureeMaxJours!: number;

  @OneToMany(() => Client, (client) => client.forfait)
  clients!: Client[];
}

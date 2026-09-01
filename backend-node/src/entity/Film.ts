import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, Index } from "typeorm";
import { Genre } from "./Genre";
import { Pays } from "./Pays";
import { Participation } from "./Participation";
import { BandeAnnonce } from "./BandeAnnonce";
import { CopieFilm } from "./CopieFilm";

@Entity({ name: "FILM" })
export class Film {
    @PrimaryGeneratedColumn({ name: "ID_FILM" })
    id!: number;

    @Index()
    @Column({ name: "TITRE" })
    titre!: string;

    @Index()
    @Column({ name: "ANNEESORTIE" })
    anneeSortie!: number;

    @Index()
    @Column({ name: "LANGUEORIGINALE", nullable: true })
    langueOriginale!: string;

    @Column({ name: "DUREEMINUTES", nullable: true })
    dureeMinutes!: number;

    @Column({ name: "RESUME", type: "clob", nullable: true })
    resume!: string;

    @Column({ name: "AFFICHEURL", nullable: true })
    afficheURL!: string;

    @Column({ name: "NBCOPIESTOTALES" })
    nbCopiesTotales!: number;

    @Column({ name: "SCENARISTE", type: "clob", nullable: true })
    scenariste!: string;

    @ManyToMany(() => Genre)
    @JoinTable({
        name: "FILMGENRE",
        joinColumn: { name: "ID_FILM", referencedColumnName: "id" },
        inverseJoinColumn: { name: "ID_GENRE", referencedColumnName: "idGenre" },
    })
    genres!: Genre[];

    @ManyToMany(() => Pays)
    @JoinTable({
        name: "FILMPAYS",
        joinColumn: { name: "ID_FILM", referencedColumnName: "id" },
        inverseJoinColumn: { name: "ID_PAYS", referencedColumnName: "idPays" },
    })
    paysProduction!: Pays[];

    @OneToMany(() => Participation, (participation) => participation.film)
    participations!: Participation[];

    @OneToMany(() => BandeAnnonce, (bandeAnnonce) => bandeAnnonce.film)
    bandeAnnonces!: BandeAnnonce[];

    @OneToMany(() => CopieFilm, (copieFilm) => copieFilm.film)
    copies!: CopieFilm[];

}

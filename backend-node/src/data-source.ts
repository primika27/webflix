import "reflect-metadata";
import { DataSource } from "typeorm";
import { Film } from "./entity/Film";
import { Utilisateur } from "./entity/Utilisateur";
import { Participation } from "./entity/Participation";
import {Genre} from "./entity/Genre";
import {Pays} from "./entity/Pays";  
import { Personne } from "./entity/Personne";
import { BandeAnnonce } from "./entity/BandeAnnonce";
import { Client } from "./entity/Client";
import { CopieFilm } from "./entity/CopieFilm";
import { Forfait } from "./entity/Forfait";
import { Location } from "./entity/Location";

export const AppDataSource = new DataSource({
    type: "oracle",
    host: "bdlog660.ens.ad.etsmtl.ca",
    port: 1521,
    username: "EQUIPE106", 
    password: "SI6xED4Q",   
    connectString: "bdlog660.ens.ad.etsmtl.ca:1521/ORCLPDB1",       
    synchronize: false,
    logging: true,
    entities: [Film, Utilisateur, Pays, Genre, Personne, Participation, BandeAnnonce, Client, CopieFilm, Forfait, Location],
});

import express from "express";
import { AppDataSource } from "./data-source";
import connexionRoutes from "./routes/connexionRoutes";
import filmRoutes from "./routes/filmRoutes";
import personneRoutes from "./routes/personneRoutes";
import clientRoutes from "./routes/clientRoutes";
import locationRoutes from './routes/locationRoutes';
import cors from "cors";

const port = 3000;


AppDataSource.initialize().then(() => {

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/connexion", connexionRoutes);
    app.use("/films", filmRoutes);
    app.use("/personnes", personneRoutes);
    app.use("/client", clientRoutes);
    app.use("/location", locationRoutes);
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });

})

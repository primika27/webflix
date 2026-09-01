import { Request, Response } from "express";
import { PersonneFacade } from "../facade/PersonneFacade";

const personneFacade = new PersonneFacade();

export const searchPersonnesHandler = async (req: Request, res: Response) => {
    try {
        const personnes = await personneFacade.searchPersonnes(req.query);
        res.status(200).json(personnes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const getPersonneByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid ID format");
        }
        const personne = await personneFacade.getPersonneById(id);
        if (!personne) {
            return res.status(404).send("Personne not found");
        }
        res.status(200).json(personne);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
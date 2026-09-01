import {Request, Response} from "express";
import { FilmFacade } from "../facade/FilmFacade";

export const getFilms = async (req: Request, res: Response) => {
    try {
        const filmFacade = new FilmFacade();
        const films = await filmFacade.searchFilms(req.query);
        console.log("Films being sent:", films);
        res.status(200).json(films);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
};

export const getCountAvailableCopies = async (req: Request, res: Response) => {
    try{ 
        const filmFacade = new FilmFacade();
        const idFilm = Number(req.query.idFilm);
        
        const count = await filmFacade.getCountAvailableCopies(idFilm);

        res.status(200).json({success: true, data: count});

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

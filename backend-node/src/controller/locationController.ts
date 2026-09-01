import {Request, Response} from "express";
import { LocationFacade } from "../facade/LocationFacade";


const locationFacade = new LocationFacade();
export const rentFilm = async (req: Request, res: Response) => {
    try{
        const {idClient, idFilm} = req.body;

        if(!idClient || !idFilm){
            return res.status(400).json({success: false, message: "idClient et idFilm sont requis"});
        }
        
        const response = await locationFacade.rentFilm(idClient, idFilm);
       
        res.status(200).json({success: true, data: response})
    } catch (err){
        console.error(err);
        return res.status(500);
    }
};

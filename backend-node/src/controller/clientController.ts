import {Request, Response} from "express";
import { ClientFacade } from "../facade/ClientFacade";


export const getClientForfait = async (req: Request, res: Response) => {
    try {
        const clientFacade = new ClientFacade();
        const idClient = Number(req.query.idClient);

        const forfaitInfo = await clientFacade.getClientWithForfait(idClient);
        if(!forfaitInfo){
            return res.status(200).json({ succes: false, message: "pas d'abonnement"});
        }
        // res.status(200).json({success: true, forfaitInfo: JSON.parse(JSON.stringify(forfaitInfo))});
        res.status(200).json({success: true, forfaitInfo: forfaitInfo});

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
};


export const getClientLocation = async (req: Request, res: Response) => {
    try {
        const clientFacade = new ClientFacade();
        const idClient = Number(req.query.idClient)

        const location = await clientFacade.getClientLocation(idClient);
        console.log("dans client controller : ", location);

        res.status(200).json({success: true, location: location});
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}
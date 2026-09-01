import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Utilisateur } from "../entity/Utilisateur";


export const trySignIn = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const utilisateur = await AppDataSource.getRepository(Utilisateur)
        .createQueryBuilder("user")
        .where("user.courriel = :email", {email})
        .andWhere("user.motDePasse = :password", {password})
        .getOne();

        if(!utilisateur){
            return res.status(200).json({ succes: false, message: "Email ou mot de passe incorrect"});
        }

        res.status(200).json({success: true, utilisateur});

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
};
import { Router } from "express";
import { getFilms, getCountAvailableCopies } from "../controller/filmController";

const router = Router();

router.get("/", getFilms);

router.get("/availableCopies", getCountAvailableCopies);


export default router;

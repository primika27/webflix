import { Router } from "express";
import { trySignIn } from "../controller/connexionController";

const router = Router();

router.post("/", trySignIn);

export default router;
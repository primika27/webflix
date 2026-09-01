import { Router } from "express";
import { getPersonneByIdHandler, searchPersonnesHandler } from "../controller/personneController";

const router = Router();

// Route for searching people (e.g., /personnes?nom=...)
router.get("/", searchPersonnesHandler);

// Route for getting a person by ID (e.g., /personnes/123)
router.get("/:id", getPersonneByIdHandler);

export default router;
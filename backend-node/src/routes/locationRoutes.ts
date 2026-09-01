import {Router} from 'express';
import { rentFilm } from '../controller/locationController';

const router = Router();

router.post("/rent", rentFilm);

export default router;
import {Router} from 'express';
import { getClientForfait, getClientLocation } from '../controller/clientController';

const router = Router();

router.get("/forfait", getClientForfait);
router.get("/location", getClientLocation);

export default router;
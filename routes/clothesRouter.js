import { Router } from 'express';
import clothesController from '../controllers/clothesController.js';

const clothesRouter = Router();

clothesRouter.get('/', clothesController.clothesGet);

clothesRouter.get('/create', clothesController.clothesCreateGET);
clothesRouter.post('/create', clothesController.clothesCreatePOST);

export default clothesRouter;
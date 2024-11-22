import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/create-bicycle', bicycleController.createBicycle);

export default bicycleRouter;

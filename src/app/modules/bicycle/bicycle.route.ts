import { Router } from 'express';
import { bicycleController } from './bicycle.controller';

const bicycleRouter = Router();

bicycleRouter.post('/products', bicycleController.createBicycle);
bicycleRouter.delete(
  '/products/:productId',
  bicycleController.deleteSingleBicycle,
);
bicycleRouter.put(
  '/products/:productId',
  bicycleController.updateSingleBicycle,
);
bicycleRouter.get('/products/:productId', bicycleController.getSingleBicycle);
bicycleRouter.get('/products', bicycleController.getBicycles);

export default bicycleRouter;

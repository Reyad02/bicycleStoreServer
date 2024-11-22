import { orderController } from './order.controller';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.post('/orders', orderController.createOrder);

export default orderRouter;

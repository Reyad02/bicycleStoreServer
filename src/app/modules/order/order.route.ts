import { orderController } from './order.controller';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.get('/orders/revenue', orderController.getTotalRevenue);
orderRouter.post('/orders', orderController.createOrder);

export default orderRouter;

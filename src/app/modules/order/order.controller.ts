import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    // const parsedBody = OrderValidationSchema.parse(payload);
    const result = await orderService.makeOrder(payload);

    res.json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message:
        error.message ||
        error.name ||
        'Something Went Wrong, So Data Is Not Inserted',
      success: false,
      error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

export const orderController = {
  createOrder,
};

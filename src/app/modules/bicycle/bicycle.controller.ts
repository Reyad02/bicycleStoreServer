import { Request, Response } from 'express';
import { bicycleService } from './bicycle.service';
import BicycleValidationSchema from './bicycle.validation';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const parsedBody = BicycleValidationSchema.parse(body);
    const result = await bicycleService.createBicycle(parsedBody);
    res.json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.name || 'Something Went Wrong, So Data Is Not Inserted',
      success: false,
      error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

export const bicycleController = {
  createBicycle,
};

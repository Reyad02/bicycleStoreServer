import { Request, Response } from 'express';
import { bicycleService } from './bicycle.service';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await bicycleService.createBicycle(body);
    res.json({
      message: 'User Created Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
};

export const bicycleController = {
  createBicycle,
};

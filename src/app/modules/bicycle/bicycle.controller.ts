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
    if (error.name === 'ZodError') {
      res.status(500).json({
        message: 'Validation failed',
        success: false,
        error,
        stack: error.stack || 'No stack trace available',
      });
    } else {
      res.status(500).json({
        message: error.name || 'Something Went Wrong, So Data Is Not Inserted',
        success: false,
        error,
        stack: error.stack || 'No stack trace available',
      });
    }
  }
};

const getBicycles = async (req: Request, res: Response) => {
  try {
    const result = await bicycleService.getBicycles();
    res.json({
      message: 'Bicycles retrieved successfully',
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

const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bicycleService.getSingleBicycle(productId);
    res.json({
      message: 'Bicycle retrieved successfully',
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

const updateSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const payload = req.body;
    const result = await bicycleService.updateSingleBicycle(productId, payload);
    res.json({
      message: 'Bicycle updated successfully',
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

const deleteSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await bicycleService.deleteSingleBicycle(productId);
    res.json({
      message: 'Bicycle deleted successfully',
      success: true,
      data: {},
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
  getBicycles,
  getSingleBicycle,
  updateSingleBicycle,
  deleteSingleBicycle,
};

import Bicycle from '../bicycle/bicycle.model';
import Iorder from './order.interface';
import Order from './order.model';

const makeOrder = async (payload: Iorder) => {
  const bicycle = await Bicycle.findById(payload.product);

  if (!bicycle) {
    const error = new Error('Bicycle not found');
    error.name = 'NotFoundError';
    throw error;
  }

  if (bicycle.quantity < payload.quantity) {
    const error = new Error('Insufficient stock');
    error.name = 'StockError';
    throw error;
  }

  await Bicycle.findByIdAndUpdate(payload.product, {
    $inc: { quantity: -payload.quantity },
    $set: { inStock: bicycle.quantity - payload.quantity > 0 },
  });

  const totalPrice = bicycle.price * payload.quantity;
  const result = await Order.create({
    email: payload.email,
    product: payload.product,
    quantity: payload.quantity,
    totalPrice,
  });

  return result;
};

const totalRevenue = async () => {
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: 'bicycles',
        localField: 'product',
        foreignField: '_id',
        as: 'currentProductInfo',
      },
    },
    {
      $unwind: '$currentProductInfo',
    },
    {
      $project: {
        totalRevenue: {
          $multiply: ['$quantity', '$currentProductInfo.price'],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalRevenue' },
      },
    },
  ]);
  return orders;
};

export const orderService = {
  makeOrder,
  totalRevenue,
};

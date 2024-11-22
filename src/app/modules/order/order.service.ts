import Bicycle from '../bicycle/bicycle.model';
import Iorder from './order.interface';
import Order from './order.model';

const makeOrder = async (payload: Iorder) => {
  const bicycle = await Bicycle.findById(payload.product);

  if (!bicycle) {
    throw new Error('Bicycle not found');
  }

  if (bicycle.quantity < payload.quantity) {
    throw new Error('Insufficient stock');
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

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

export const orderService = {
  makeOrder,
};

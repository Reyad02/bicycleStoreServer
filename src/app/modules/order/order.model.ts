import { model, Schema } from 'mongoose';
import Iorder from './order.interface';

const orderSchema = new Schema<Iorder>(
  {
    email: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Bicycle',
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a non-negative integer'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number or zero'],
    },
  },
  { timestamps: true },
);

const Order = model<Iorder>('Order', orderSchema);
export default Order;

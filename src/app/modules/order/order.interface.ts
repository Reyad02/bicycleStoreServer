import { Types } from 'mongoose';

interface Iorder {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice?: number;
}

export default Iorder;

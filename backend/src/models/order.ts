import mongoose, { Schema } from 'mongoose';

export interface IOrder {
  payment: string,
  email: string,
  phone: string,
  address: string,
  total: number,
  items: string[]
}

const orderSchema = new Schema<IOrder>({
  payment: {
    type: String,
    enum: ['card', 'online'],
    required: [true, 'Поле "payment" обязательно'],
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
  },
  phone: {
    type: String,
    required: [true, 'Поле "phone" должно быть заполнено'],
  },
  address: {
    type: String,
    required: [true, 'Поле "address" должно быть заполнено'],
  },
  total: {
    type: Number,
    required: [true, 'Поле "total" обязательно'],
  },
  items: [{ type: String }],
});

const Order = mongoose.model<IOrder>('order', orderSchema);
export default Order;

import mongoose, { Schema } from 'mongoose';

export interface IImage {
  fileName: string,
  originalName: string
}

export interface IProduct {
  title: string,
  image: IImage,
  category: string,
  description: string,
  price: null
}

const imageSchema = new Schema<IImage>({
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
});

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
    required: [true, 'Поле "title" должно быть заполнено'],
    unique: true,
  },
  image: {
    type: imageSchema,
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
});

const Product = mongoose.model<IProduct>('product', productSchema);

export default Product;

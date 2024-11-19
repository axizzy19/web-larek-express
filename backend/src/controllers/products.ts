import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request-error';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    return res.status(201).send({ data: products });
  } catch (error: any) {
    return next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      image, title, category, description, price,
    } = req.body;

    const product = await Product.create({
      image, title, category, description, price,
    });
    return res.status(201).send({ data: product });
  } catch (error: any) {
    if (error.message.includes('E11000')) {
      return next(new ConflictError('Продукт с таким заголовком уже существует'));
    }

    if (error.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка валидации данных'));
    }

    return next(error);
  }
};

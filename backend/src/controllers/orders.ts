import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      payment, email, phone, address, total, items,
    } = req.body;

    if (!payment || !email || !phone || !address || !total || !items) {
      return next(new BadRequestError('Все поля обязательны'));
    }

    if (!['card', 'online'].includes(payment)) {
      return next(new BadRequestError('Поле payment должно быть "card" или "online"'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new BadRequestError('Неверный формат email'));
    }

    const products = await Product.find({ _id: { $in: items } });
    if (products.length !== items.length) {
      return next(new BadRequestError('Один или несколько товаров не найдены'));
    }

    const invalidProducts = products.filter((product) => product.price === null);
    if (invalidProducts.length > 0) {
      return next(new BadRequestError('Некоторые товары недоступны для продажи'));
    }

    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);
    if (calculatedTotal !== total) {
      return next(new BadRequestError(`Сумма заказа не совпадает. Ожидалось: ${calculatedTotal}`));
    }

    const orderId = faker.string.uuid();

    return res.status(201).send({ id: orderId, total: calculatedTotal });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;

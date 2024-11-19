import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

export const createProductValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.empty': 'Поле "title" должно быть заполнено',
        'strings.min': 'Минимальная длина поля "title" - 2',
        'strings.max': 'Максимальная длина поля "title" - 30',
      }),
    category: Joi.string().required().messages({
      'strings.empty': 'Поле "category" должно быть заполнено',
    }),
    description: Joi.string().allow('').optional(),
    price: Joi.number().allow(null).optional(),
    image: Joi.object()
      .keys({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      }).required(),
  }),
});

export const createOrderValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required().messages({
      'any.required': 'Поле "payment" обязательно',
      'any.only': 'Поле "payment" может быть только "card" или "online"',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Поле "email" должно быть валидным email-адресом',
      'any.required': 'Поле "email" обязательно',
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': 'Поле "phone" должно быть валидным номером телефона',
        'any.required': 'Поле "phone" обязательно',
      }),
    address: Joi.string()
      .required()
      .messages({
        'any.required': 'Поле "address" обязательно',
      }),
    total: Joi.number()
      .positive()
      .required()
      .messages({
        'number.positive': 'Поле "total" должно быть положительным числом',
        'any.required': 'Поле "total" обязательно',
      }),
    items: Joi.array()
      .items(Joi.string())
      .required(),
  }),
});

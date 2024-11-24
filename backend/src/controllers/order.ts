import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/BadRequestError';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderData = req.body;

  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    return next(new BadRequestError('Заказ пустой'));
  }

  let totalPrice = 0;

  try {
    const products = await Promise.all(
      orderData.items.map(async (item: string) => {
        const product = await Product.findById(item);
        if (!product) {
          throw new BadRequestError(`Товара ${item} не существует`);
        }

        if (product.price === null) {
          throw new BadRequestError(`Товар ${item} не продается`);
        }

        totalPrice += product.price;
        return product;
      })
    );

    if (totalPrice !== Number(orderData.total)) {
      throw new BadRequestError(`Неверная сумма заказа: ${totalPrice}`);
    }

    if (!['card', 'online'].includes(orderData.payment)) {
      throw new BadRequestError('Неверный способ оплаты');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(orderData.email)) {
      throw new BadRequestError('Неверная почта');
    }

    if (!orderData.phone) {
      throw new BadRequestError('Требуется телефон');
    }

    if (!orderData.address) {
      throw new BadRequestError('Требуется адрес');
    }

    return res.status(200).send({
      id: faker.string.uuid(),
      total: totalPrice,
    });
  } catch (error) {
    next(error);
  }
};

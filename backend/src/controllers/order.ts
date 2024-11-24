import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/BadRequestError';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderData = req.body;

  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    return next(new BadRequestError('Нет товаров в заказе'));
  }

  let totalPrice = 0;

  try {
    const products = await Promise.all(
      orderData.items.map(async (item: string) => {
        const product = await Product.findById(item);
        if (!product) {
          throw new BadRequestError(`Товара с ID '${item}' не существует`);
        }

        if (product.price === null) {
          throw new BadRequestError(`Товар с ID '${item}' не продается`);
        }

        totalPrice += product.price;
        return product;
      })
    );

    if (totalPrice !== Number(orderData.total)) {
      throw new BadRequestError(`Неверная сумма заказа: ${totalPrice}, ожидается: ${orderData.total}`);
    }

    return res.status(200).send({
      id: faker.string.uuid(),
      total: totalPrice,
    });
  } catch (error) {
    next(error);
  }
};

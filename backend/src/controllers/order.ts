import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/BadRequestError';
import HttpStatus from '../constants/httpStatus';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const orderData = req.body;

  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    return next(new BadRequestError('Нет товаров в заказе'));
  }

  let totalPrice = 0;

  try {
    await Promise.all(
      orderData.items.map(async (item: string) => {
        const product = await Product.findById(item);
        if (!product) {
          return next(new BadRequestError(`Товара с ID '${item}' не существует`));
        }

        if (product.price === null) {
          return next(new BadRequestError(`Товар с ID '${item}' не продается`));
        }

        totalPrice += product.price;
        return product;
      }),
    );

    if (totalPrice !== Number(orderData.total)) {
      return next(new BadRequestError(`Неверная сумма заказа: ${totalPrice}, ожидается: ${orderData.total}`));
    }

    return res.status(HttpStatus.OK).send({
      id: faker.string.uuid(),
      total: totalPrice,
    });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;

import { Request, Response } from 'express';
import Product from '../models/product';
import { faker } from '@faker-js/faker';

export const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    return res.status(400).send('Заказ пустой');
  }

  let totalPrice = 0;

  try {
    const products = await Promise.all(
      orderData.items.map(async (item: string) => {
        const product = await Product.findById(item);
       if (!product) {
          throw new Error(`Товара ${item} не существует`);
       }

       if (product.price === null) {
          throw new Error(`Товар ${item} не продается`);
       }

       totalPrice += product.price;
       return product;
     })
    );

  if (totalPrice !== Number(orderData.total)) {
      throw new Error(`Неверная сумма заказа: ${totalPrice}`);
  }

  if (!['card', 'online'].includes(orderData.payment)) {
      throw new Error('Неверный способ оплаты');
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(orderData.email)) {
      throw new Error('Неверная почта');
  }

  if (!orderData.phone) {
      throw new Error('Требуется телефон');
  }

  if (!orderData.address) {
      throw new Error('Требуется адрес');
  }

  return res.status(200).send({
    id: faker.string.uuid(),
    total: totalPrice,
  });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
}
    return res.status(500).send('Внутренняя ошибка сервера');
  }
};

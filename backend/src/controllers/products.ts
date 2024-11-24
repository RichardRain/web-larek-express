import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = (req: Request, res: Response) => {
  Product.find({})
    .then(products => res.send({ items: products, total: products.length }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка', error: err.message }));

}

export const createProduct = (req: Request, res: Response) => {
  const { title, image, category, description, price } = req.body;

  return Product.create({title, image, category, description, price})
    .then(product => res.send({ data: product }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка', error: err.message }));
}
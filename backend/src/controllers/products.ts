import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';
import { Error as MongooseError } from 'mongoose';

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then(products => res.send({ items: products, total: products.length }))
    .catch(err => next(err));
}

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const { title, image, category, description, price } = req.body;

  return Product.create({title, image, category, description, price})
    .then(product => res.send({ data: product }))
    .catch(err => {
      if (err instanceof Error && err.message.includes('E11000')) {
        return next(new ConflictError('Товар с таким названием уже существует'));
      }
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError('Ошибка валидации данных при создании товара'));
      }
      return next(err);
    });
}
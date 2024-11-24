import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
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
        return next(new BadRequestError(`Ошибка валидации данных при создании товара: ${err.message}`));
      }
      return next(err);
    });
}

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  try {
    const product = Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new NotFoundError(`Товар с ID ${productId} не найден`));
    }

    res.status(200).send({ message: 'Товар успешно удален', data: product });
  } catch (err) {
    return next(err);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new NotFoundError(`Товар с ID ${productId} не найден`));
    }

    res.status(200).send({ message: 'Товар успешно обновлен', data: product });
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(`Ошибка валидации данных при обновлении товара: ${err.message}`));
    }

    return next(err);
  }
};

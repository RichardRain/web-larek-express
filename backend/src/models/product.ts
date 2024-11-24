import mongoose from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: [true, 'Поле "fileName" должно быть заполнено'],
  },
  originalName: {
    type: String,
    required: [true, 'Поле "originalName" должно быть заполнено'],
  },
});

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description: string;
  price: number|null;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
    unique: true,
  },
  image: {
    type: imageSchema,
    required: [true, 'Поле "image" должно быть заполнено'],
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    min: [0, 'Цена не может быть отрицательной'],
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);

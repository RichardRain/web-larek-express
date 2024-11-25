import { celebrate, Joi, Segments } from 'celebrate';

export const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.empty': 'Поле "title" должно быть заполнено',
        'string.min': 'Поле "title" должно содержать не менее {#limit} символов',
        'string.max': 'Поле "title" не может содержать более {#limit} символов',
      }),
    image: Joi.object({
      fileName: Joi.string().required().messages({
        'string.empty': 'Поле "fileName" должно быть заполнено',
      }),
      originalName: Joi.string().required().messages({
        'string.empty': 'Поле "originalName" должно быть заполнено',
      }),
    }).required().messages({
      'any.required': 'Поле "image" должно быть заполнено',
    }),
    category: Joi.string().required().messages({
      'string.empty': 'Поле "category" должно быть заполнено',
    }),
    description: Joi.string().allow(''),
    price: Joi.number().allow(null),
  }),
});

export const validateProductUpdateBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "title" должно содержать не менее {#limit} символов',
      'string.max': 'Поле "title" не может содержать более {#limit} символов',
    }),
    image: Joi.object({
      fileName: Joi.string(),
      originalName: Joi.string(),
    }),
    category: Joi.string(),
    description: Joi.string(),
    price: Joi.number().allow(null),
  }),
});

export const validateObjId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    productId: Joi.string().hex().length(24).required()
      .required()
      .messages({
        'string.empty': 'Поле "productId" должно быть заполнено',
        'string.hex': 'Поле "productId" должно быть в формате MongoDB ObjectId',
        'string.length': 'Поле "productId" должно содержать 24 символа',
      }),
  }),
});

export const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    items: Joi.array().items(Joi.string().hex().length(24)).min(1).required()
      .messages({
        'array.empty': 'Поле "items" не может быть пустым',
        'array.min': 'Поле "items" должно содержать не менее {#limit} элемента',
      }),
    total: Joi.number().required().messages({
      'number.empty': 'Поле "total" должно быть заполнено',
    }),
    payment: Joi.string().valid('card', 'online').required().messages({
      'any.only': 'Поле "payment" должно быть "card" или "online"',
      'any.required': 'Поле "payment" должно быть заполнено',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Поле "email" должно быть в формате электронной почты',
      'string.empty': 'Поле "email" должно быть заполнено',
    }),
    phone: Joi.string().required().messages({
      'string.empty': 'Поле "phone" должно быть заполнено',
    }),
    address: Joi.string().required().messages({
      'string.empty': 'Поле "address" должно быть заполнено',
    }),
  }),
});

const { celebrate, Joi } = require('celebrate');

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[-a-zA-Z0-9@:%._+~#=]+/).messages({
      'string.notURL': 'Неправильный адрес.',
      'any.required': 'Укажите ссылку на аватар.',
    }),
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле с email не должно быть пустым.',
        'string.notEmail': 'Некорректный email',
        'string.min': 'email слишком короткий',
        'any.required': 'Введите email.',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан.',
    }),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(4)
      .messages({
        'string.empty': 'Поле с email не должно быть пустым.',
        'string.notEmail': 'Некорректный email',
        'string.min': 'email слишком короткий',
        'any.required': 'Введите email.',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан.',
    }),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Введите название карточки.',
        'string.min': 'Имя карточки слишком короткое',
        'string.empty': 'Поле с названием карточки не должно быть пустым.',
      }),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[-a-zA-Z0-9@:%._+~#=]+/)
      .messages({
        'any.required': 'Введите ссылку на карточку.',
        'string.empty': 'Поле с ссылкой на арточку не должно быть пустым.',
        'string.notURL': 'Неправильный адрес.',
      }),
  }),
});

module.exports.validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Введите имя пользователя.',
        'string.min': 'Имя слишком короткое',
        'string.max': 'Имя слишком длинное',
        'string.empty': 'Поле с именем не должно быть пустым.',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Введите описание пользователя.',
        'string.min': 'Описание слишком короткое',
        'string.max': 'Описание слишком длинное',
        'string.empty': 'Поле с описанием не должно быть пустым.',
      }),
  }),
});

module.exports.validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[-a-zA-Z0-9@:%._+~#=]+/)
      .messages({
        'string.notURL': 'Неправильный адрес.',
        'any.required': 'Укажите ссылку на аватар.',
      }),
  }),
});

const express = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError'); // 404
const auth = require('./middlewares/auth');

const app = express();
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

const {
  createUser,
  login,
} = require('./controllers/users');

// подклюение к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/signin', celebrate({
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
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().messages({
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
}), createUser);

app.use(auth);

app.use('/', routerUsers);
app.use('/', routerCards);
app.use('*', () => {
  throw new NotFoundError('Указан неверный путь');
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(3000, () => {
  console.log("I'm working!");
});

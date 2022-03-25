const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError'); // 401

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  const token = req.cookies.jwt;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   next(new UnauthorizedError('Пожалуйста, авторизуйтесь.'));
  //   return;
  // }
  // const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

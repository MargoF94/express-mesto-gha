const routerCards = require('express').Router();
const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

routerCards.get('/cards', getCards);
routerCards.post('/cards', createCard);
routerCards.put('/cards/:cardId/likes', likeCard);
routerCards.delete('/cards/:cardId/likes', dislikeCard);
routerCards.delete('/cards/:cardId', deleteCard);

module.exports = routerCards;

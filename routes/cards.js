const routerCards = require('express').Router();
const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');
const {
  validateCardId,
  validateCreateCard,
} = require('../middlewares/validators');

routerCards.get('/cards', getCards);
routerCards.post('/cards', validateCreateCard, createCard);
routerCards.put('/cards/:cardId/likes', validateCardId, likeCard);
routerCards.delete('/cards/:cardId/likes', validateCardId, dislikeCard);
routerCards.delete('/cards/:cardId', validateCardId, deleteCard);

module.exports = routerCards;

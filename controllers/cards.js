const Card = require('../models/card');
// const ValidationError = require('../utils/errors');

// возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    // .populate(['owner', 'likes'])
    .then((cards) => {
      if (!cards) {
        res.status(400).send({ message: 'Не удалось найти карочки.' });
      }
      res.send({ cards });
    })
    .catch(() => {
      res.status(500).send({ message: 'Не удалось найти карочки.' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const likes = [];

  Card.create({
    name,
    link,
    owner,
    likes,
  })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
      createdAt: card.createdAt,
    }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// добавление лайка
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(400).send({ message: 'Карточка не найдена.' });
      } else {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          likes: card.likes,
          createdAt: card.createdAt,
          _id: card._id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// удвление лайка
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: req.user._id,
        likes: card.likes,
        createdAt: card.createdAt,
      });
    });
};

// удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send({ message: 'Карточка успешно удалена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

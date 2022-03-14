const Card = require('../models/card');

// возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: req.params._id,
        likes: card.likes,
        createdAt: card.createdAt,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      owner: req.user._id,
      likes: card.likes,
      createdAt: card.createdAt,
    }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// добавление лайка
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!req.params._id) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send({
          name: card.name,
          link: card.link,
          owner: req.user._id,
          likes: card.likes,
          createdAt: card.createdAt,
        });
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

// удвление лайка
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
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
  Card.delete(req.params._id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send({ data: card });
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

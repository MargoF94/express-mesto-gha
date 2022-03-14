const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подклюение к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', require('./routes/users'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '622da73df257b6c3374d1c76', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', routerUsers);
app.use('/', routerCards);

app.listen(3000, () => {
  console.log("I'm working!");
});

const routerUsers = require('express').Router();
const {
  getUsers,
  getUserdById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/me', getCurrentUser);
routerUsers.get('/users/:userId', getUserdById);
routerUsers.patch('/users/me', updateUser);
routerUsers.patch('/users/me/avatar', updateAvatar);

module.exports = routerUsers;

const routerUsers = require('express').Router();
const {
  getUsers,
  getUserdById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validators');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/me', validateGetUserById, getCurrentUser);
routerUsers.get('/users/:userId', validateGetUserById, getUserdById);
routerUsers.patch('/users/me', validateUpdateUser, updateUser);
routerUsers.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = routerUsers;

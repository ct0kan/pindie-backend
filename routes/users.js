const usersRouter = require('express').Router();
  
const { checkAuth } = require('../middlewares/auth');
const {
    findAllUsers,
    findUserById,
    createUser,
    deleteUser,
    updateUser,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    hashPassword,
} = require('../middlewares/users');
const { sendAllUsers, getUser, deleteUserController } = require('../controllers/users');

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, getUser);
usersRouter.get("/me", checkAuth, getUser);
usersRouter.post('/users', checkEmptyNameAndEmailAndPassword, checkAuth, hashPassword, createUser, getUser);
usersRouter.put('/users/:id', checkEmptyNameAndEmail, checkAuth, updateUser, getUser);
usersRouter.delete('/users/:id', checkAuth, deleteUser, deleteUserController);

module.exports = usersRouter;

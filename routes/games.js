const gamesRouter = require('express').Router();
  
const { checkAuth } = require('../middlewares/auth');
const {
    findAllGames,
    findGameById,
    createGame,
    deleteGame,
    updateGame,
    checkIsVoteRequest,
    checkEmptyFields,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkIfGameExists,
} = require('../middlewares/games');
const { sendAllGames, getGame, deleteGameController } = require('../controllers/games');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get('/games/:id', findGameById, getGame);
gamesRouter.post('/games', findAllGames, checkIfGameExists, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, createGame, getGame);
gamesRouter.put(
    '/games/:id',
    findGameById,
    checkIsVoteRequest,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    updateGame,
    getGame,
);
gamesRouter.delete('/games/:id', checkAuth, deleteGame, deleteGameController);

module.exports = gamesRouter;

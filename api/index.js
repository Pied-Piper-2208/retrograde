const apiRouter = require ('express').Router();

const gamesRouter = require('./games')
apiRouter.use('/games', gamesRouter);

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter);

apiRouter.get('/', (req, res) => {
    res.send('Hello World!')
});

module.exports = apiRouter;
const apiRouter = require ('express').Router();

const gamesRouter = require('./games')
apiRouter.use('/games', gamesRouter);

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter);

const ordersRouter = require('./orders')
apiRouter.use('/orders', ordersRouter);

apiRouter.get('/', (req, res) => {
    res.send('Hello World!')
});

module.exports = apiRouter;
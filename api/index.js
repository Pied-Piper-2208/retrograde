const apiRouter = require ('express').Router();

const gamesRouter = require('./games')
apiRouter.use('/games', gamesRouter);

apiRouter.get('/', (req, res) => {
    res.send('Hello World!')
});

module.exports = apiRouter;
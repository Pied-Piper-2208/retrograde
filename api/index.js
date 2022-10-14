const apiRouter = require ('express').Router()
const {getUserById} = require('../db')
const jwt = require('jsonwebtoken')

apiRouter.use(async (req, res, next) => {
    const prefix = 'Token '
    const auth = req.header('Authorization')

    if (!auth) next()
    if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length)
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET)

            if (id) {
                req.user = await getUserById(id)
                next()
            }
        } catch ({ name, message }) {
            next({ name, message })
        }
    }
    next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
    })
})

const gamesRouter = require('./games')
apiRouter.use('/games', gamesRouter);

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter);

const ordersRouter = require('./orders')
apiRouter.use('/orders', ordersRouter);

module.exports = apiRouter;
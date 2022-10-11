const ordersRouter = require('express').Router();
const {  getCartByUserId } = require('../db');

ordersRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const order = await getCartByUserId(userId)
        res.send(order)
    } catch (error) {
        console.error('Error getting order!')
        throw error;
    }
})

module.exports = ordersRouter;
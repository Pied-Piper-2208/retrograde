const ordersRouter = require('express').Router();
const {  getCartByUserId, orderIsOpenFalse } = require('../db');

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

ordersRouter.patch('/:orderId', async (req, res) => {
    const { orderId } = req.params
    try {
        const order = await orderIsOpenFalse(orderId)
        res.send(order)
    } catch (error) {
        console.error('Error closing order!')
        throw error;
    }
})

module.exports = ordersRouter;
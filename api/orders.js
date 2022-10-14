const ordersRouter = require('express').Router();
const {  getCartByUserId, orderIsOpenFalse, deleteGameFromCart, createOrder, createOrders_Games } = require('../db');

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

ordersRouter.delete('/:orderId', async (req, res) => {
    const { orderId } = req.params
    try {
        const order = await deleteGameFromCart(orderId)
        res.send(order)
    } catch (error) {
        console.error('Error deleting game from cart order!')
        throw error;
    }
})

ordersRouter.post('/', async (req, res) => {
    const { gameId, userId } = req.body
    try {
        const { id } = await createOrder({userId, isOpen: true});
        const cartItem = await createOrders_Games({orderId: id, gameId});

        res.send(cartItem);
    } catch (error) {
        console.error("Error adding item to user's cart!")
        throw error;
    }
});


module.exports = ordersRouter;
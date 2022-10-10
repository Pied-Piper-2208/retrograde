const client = require('./client');

const createOrders_Games = async ({ orderId, gameId }) => {
    try {
        const { rows: [ordersGamesEntry] } = await client.query(`
            INSERT INTO orders_games("orderId", "gameId")
            VALUES($1, $2)
            RETURNING *;
        `, [orderId, gameId])

        return ordersGamesEntry;
    } catch (error) {
        console.error('Error creating ordersGamesEntry!')
        throw error;
    }
};

module.exports = { createOrders_Games }
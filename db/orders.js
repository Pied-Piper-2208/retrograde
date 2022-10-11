const client = require('./client');

const createOrder = async ({ userId, isOpen }) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders("userId", "isOpen")
            VALUES($1, $2)
            RETURNING *;
        `, [userId, isOpen])

        return order;
    } catch (error) {
        console.error('Error creating order!')
        throw error;
    }
};

const getCartByUserId = async (userId) => {
    try {
        const { rows } = await client.query(`
            SELECT games.id AS id, name, price, "orderId"
            FROM games
            JOIN orders_games
            ON games.id = orders_games."gameId"
            JOIN orders
            ON orders_games."orderId" = orders.id
            WHERE orders."userId" = $1
            AND orders."isOpen" = true;
        `,[userId])
        return rows
    } catch (error) {
        console.error('Error getting cart!')
        throw error;
    }
}

const orderIsOpenFalse = async (orderId) => {
    try {
        const { rows: [order] } = await client.query(`
            UPDATE orders
            SET "isOpen" = false
            WHERE id = $1
            RETURNING *;
        `,[orderId])
        return order
    } catch (error) {
        console.error('Error closing order!')
        throw error;
    }
}


module.exports = { createOrder, getCartByUserId, orderIsOpenFalse };
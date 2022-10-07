const client = require('./client');

const createOrder = async ({ userId, isOPEN }) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO order(userId, isOPEN)
            VALUES($1, $2)
            RETURNING *;
        `, [userId, isOPEN])

        return order;
    } catch (error) {
        console.error('Error creating order!')
        throw error;
    }
};

const client = require('./client');


module.exports = { createOrder };
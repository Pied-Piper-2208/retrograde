const client = require('./index');

const createGame = async ({ name, price, genre, description }) => {
    try {
        const { rows: [game] } = await client.query(`
            INSERT INTO games(name, price, genre, description)
            VALUES($1, $2, $3, $4)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, price, genre, description])

        return game;
    } catch (error) {
        console.error('Error creating game!')
        throw error;
    }
};

module.exports = { createGame };
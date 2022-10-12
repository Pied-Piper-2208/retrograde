const client = require('./client');

const createGame = async ({ name, price, genre, image, description }) => {
    try {
        const { rows: [game] } = await client.query(`
            INSERT INTO games(name, price, genre, image, description)
            VALUES($1, $2, $3, $4, $5)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, price, genre, image, description])

        return game;
    } catch (error) {
        console.error('Error creating game!')
        throw error;
    }
};

const removeGame = async (id) => {
    try {
        await client.query(`
            DELETE FROM orders_games
            WHERE "gameId" = $1;
        `,[id])

        const { rows: [game] } = await client.query(`
            DELETE FROM games
            WHERE id = $1
            RETURNING *;
        `,[id])

        return game
    } catch (error) {
        console.error('Error removing game!')
        throw error;
    }
}

const editGame = async ({id, name, price, genre, description}) => {
    try {
        const { rows: [game] } = await client.query(`
            UPDATE games SET
                name = COALESCE($2, name),
                price = COALESCE($3, price),
                genre = COALESCE($4, genre),
                description = COALESCE($5, description)
            WHERE id = $1
            RETURNING *;
        `,[id, name, price, genre, description])
        
        return game
    } catch (error) {
        console.error('Error removing game!')
        throw error;
    }
}

const getAllGames = async () => {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM games;
        `)
        
        return rows;
    } catch (error) {
        console.error('Error getting games!')
        throw error;
    }
};

const getGameById = async (id) => {
    try {
        const { rows: [game] } = await client.query(`
            SELECT *
            FROM games
            WHERE id = $1;
        `,[id])
        return game
    } catch (error) {
        console.error('Error getting game!')
        throw error;
    }
}

module.exports = { createGame, getAllGames, getGameById, removeGame, editGame };
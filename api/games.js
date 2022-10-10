const gamesRouter = require('express').Router();
const { getAllGames, getGameById } = require('../db');

gamesRouter.get('/', async (req, res) => {
    try {
        const allGames = await getAllGames();

        res.send(allGames);
    } catch (error) {
        console.error('Error getting games!')
        throw error;
    }
});

gamesRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const game = await getGameById(id)
        res.send(game)
    } catch (error) {
        console.error('Error getting game!')
        throw error;
    }
})

module.exports = gamesRouter;
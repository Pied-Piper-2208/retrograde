const gamesRouter = require('express').Router();
const { getAllGames } = require('../db');

gamesRouter.get('/', async (req, res) => {
    try {
        const allGames = await getAllGames();
        console.log("getallgames", allGames)

        res.send(allGames);
    } catch (error) {
        console.error('Error getting games!')
        throw error;
    }
});

module.exports = gamesRouter;
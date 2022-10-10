const gamesRouter = require('express').Router();
const { getAllGames, getGameById, editGame, removeGame } = require('../db');

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

gamesRouter.patch('/:id', async (req, res) => {
    const { id } = req.params
    const params = req.body
    try {
        const game = await editGame({id,...params})
        res.send(game)
    } catch (error) {
        console.error('Error editing game!')
        throw error;
    }
})

gamesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const game = await removeGame(id)
        res.send(game)
    } catch (error) {
        console.error('Error removing game!')
        throw error;
    }
})

module.exports = gamesRouter;
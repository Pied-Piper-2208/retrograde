const express = require('express');
const router = express.Router();
const { getAllGames } = require('../db');

router.get('/', async (req, res) => {
    try {
        const allGames = await getAllGames();

        res.send(allGames);
    } catch (error) {
        console.error('Error getting all games!')
        throw error;
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const gamesRouter = require('./games')
router.use('/games', gamesRouter);

const app = express();
app.listen(4000);

module.exports = router;
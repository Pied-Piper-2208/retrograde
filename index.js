const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api', require('./api'));

const apiRouter = require('./api')
app.use('/api', apiRouter);

const { PORT = 4000 } = process.env;
app.listen(PORT, async () => {
    console.log(`App listening in port ${PORT}`);
});
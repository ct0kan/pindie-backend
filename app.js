const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const cors = require('./middlewares/cors');

const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');

const connectToDatabase = require('./database/connect');

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(
    cors,
    cookieParser(),
    bodyParser.json(),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname, 'public')),
);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
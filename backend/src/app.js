const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets');
const searchRouter = require('./routes/search');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/planets', planetsRouter);
app.use('/search', searchRouter);

module.exports = app;

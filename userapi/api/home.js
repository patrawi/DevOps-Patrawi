const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => res.send('Hello World! From Thailand'));

module.exports = homeRouter;

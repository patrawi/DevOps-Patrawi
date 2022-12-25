const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => res.send('Hello World! 123456789'));

module.exports = homeRouter;

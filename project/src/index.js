const express = require('express');
const userRouter = require('./api/user');
const bodyParser = require('body-parser');
const homeRouter = require('./api/home');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./api/dbClient');
db.on('error', (err) => {
  console.error(err);
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use('/', homeRouter);
app.use('/user', userRouter);

const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log('Server listening the port ' + port);
});

module.exports = server;

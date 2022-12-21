const express = require('express');
const userRouter = require('../routes/user');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const db = require('../dbClient');
db.on('error', (err) => {
  console.error(err);
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use((res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type,Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
});
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/user', userRouter);

const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log('Server listening the port ' + port);
});

module.exports = server;

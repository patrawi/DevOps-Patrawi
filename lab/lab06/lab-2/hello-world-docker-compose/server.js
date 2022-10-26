'use strict';

const express = require('express');
const client = require('./dbClient');

const PORT = 8080;

async function get_hit_count(callback) {
  client.connect().then(async (res) => {
    client.incr('hits', (err) => {

      client.get('hits', (err, res) => {
  
        callback(res)

      })
    });
  }).catch((err) => {
    console.log('err happend' + err);
  })

}

const app = express();
app.get('/', (req, res) => {
  get_hit_count((count) => {
    res.send('Hello World from Docker! I have been seen ' + count + ' times');
  })
  client.disconnect
});

app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
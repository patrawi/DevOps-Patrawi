const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send().json({
    message: 'YIKE',
  });
});

app.listen(8080, () => {
  console.log('Listern on 8080');
});

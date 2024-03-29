const express = require('express');
const userController = require('./controllers/user');

const userRouter = express.Router();

userRouter.post('/', async (req, resp) => {
  const result = await userController.create(req.body);
  if (result && result.message && result.stack) {
    return resp.status(400).json({
      status: 'error',
      message: result.message,
    });
  }
  return resp.status(201).json({
    status: 'success',
    message: result,
  });
});
userRouter.get('/:username', async (req, resp, next) => {
  const username = req.params.username;
  const result = await userController.get(username);
  if (result && result.message && result.stack) {
    return resp.status(400).json({
      status: 'error',
      message: result.message,
    });
  }
  return resp.status(200).json({
    status: 'success',
    message: result,
  });
});

module.exports = userRouter;

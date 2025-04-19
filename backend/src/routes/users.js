// src/routes/users.js
const express = require('express');
const { createUser } = require('../controllers/usersController');

module.exports = (knex) => {
  const router = express.Router();

  // POST /api/users
  router.post('/', (req, res) => createUser(knex, req, res));

  return router;
};

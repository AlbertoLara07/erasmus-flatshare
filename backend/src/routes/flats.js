// src/routes/flats.js
const express = require('express');
const {
  listFlats,
  createFlat,
  getFlatById,
  updateFlat,
  deleteFlat
} = require('../controllers/flatsController');

module.exports = (knex) => {
  const router = express.Router();

  router.get('/', (req, res) => listFlats(knex, req, res));
  router.post('/', (req, res) => createFlat(knex, req, res));
  router.get('/:id', (req, res) => getFlatById(knex, req, res));
  router.put('/:id', (req, res) => updateFlat(knex, req, res));
  router.delete('/:id', (req, res) => deleteFlat(knex, req, res));

  return router;
};

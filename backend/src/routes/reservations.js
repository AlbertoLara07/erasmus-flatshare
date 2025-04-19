// src/routes/reservations.js
const express = require('express');
const {
  reserveFlat,
  acceptReservation,
  denyReservation,
  listReservationsByFlat
} = require('../controllers/reservationsController');

module.exports = (knex) => {
  const router = express.Router();

  // Crear reserva
  router.post('/flats/:id/reserve', (req, res) => reserveFlat(knex, req, res));
  // Listar reservas de un piso
  router.get('/flats/:id/reservations', (req, res) => listReservationsByFlat(knex, req, res));
  // Aceptar reserva
  router.put('/reservations/:rid/accept', (req, res) => acceptReservation(knex, req, res));
  // Denegar reserva
  router.put('/reservations/:rid/deny', (req, res) => denyReservation(knex, req, res));
  return router;
};
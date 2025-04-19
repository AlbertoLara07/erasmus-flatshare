// src/controllers/reservationsController.js

// Crear una reserva para un piso
exports.reserveFlat = async (knex, req, res) => {
    try {
      const { id: flat_id } = req.params;
      const { user_id } = req.body;
      if (!user_id) return res.status(400).json({ error: 'Falta user_id' });
      const [reservation] = await knex('reservations')
        .insert({ flat_id, user_id })
        .returning('*');
      res.status(201).json(reservation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear reserva' });
    }
  };
  
  // Aceptar reserva
  exports.acceptReservation = async (knex, req, res) => {
    try {
      const { rid } = req.params;
      const [reservation] = await knex('reservations')
        .where('id', rid)
        .update({ status: 'aceptado' })
        .returning('*');
      if (!reservation) return res.status(404).json({ error: 'Reserva no encontrada' });
      res.json(reservation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al aceptar reserva' });
    }
  };
  
  // Denegar reserva
  exports.denyReservation = async (knex, req, res) => {
    try {
      const { rid } = req.params;
      const [reservation] = await knex('reservations')
        .where('id', rid)
        .update({ status: 'denegado' })
        .returning('*');
      if (!reservation) return res.status(404).json({ error: 'Reserva no encontrada' });
      res.json(reservation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al denegar reserva' });
    }
  };
  
  // Listar reservas de un piso
exports.listReservationsByFlat = async (knex, req, res) => {
  try {
    const { id: flat_id } = req.params;
    const reservations = await knex('reservations')
      .where('flat_id', flat_id)
      .join('users', 'reservations.user_id', 'users.id')
      .select(
        'reservations.id',
        'users.name',
        'users.instagram_handle',
        'reservations.status',
        'reservations.requested_at'
      );
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

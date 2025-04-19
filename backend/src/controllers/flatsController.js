// src/controllers/flatsController.js

// Listar todos los pisos
exports.listFlats = async (knex, req, res) => {
    try {
      const flats = await knex('flats').select('*');
      res.json(flats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los pisos' });
    }
  };
  
  // Crear un piso
  exports.createFlat = async (knex, req, res) => {
    try {
      const { host_id, title, description, price, total_spots, whatsapp_invite } = req.body;
      if (!host_id || !title || price == null || total_spots == null) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const [flat] = await knex('flats')
        .insert({ host_id, title, description, price, total_spots, whatsapp_invite })
        .returning('*');
      res.status(201).json(flat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear piso' });
    }
  };
  
  // Obtener detalle de un piso
  exports.getFlatById = async (knex, req, res) => {
    try {
      const { id } = req.params;
      const flat = await knex('flats').where('id', id).first();
      if (!flat) return res.status(404).json({ error: 'Piso no encontrado' });
      res.json(flat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener piso' });
    }
  };
  
  // Actualizar un piso
  exports.updateFlat = async (knex, req, res) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const [flat] = await knex('flats')
        .where('id', id)
        .update(changes)
        .returning('*');
      if (!flat) return res.status(404).json({ error: 'Piso no encontrado' });
      res.json(flat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar piso' });
    }
  };
  
  // Borrar un piso
  exports.deleteFlat = async (knex, req, res) => {
    try {
      const { id } = req.params;
      const count = await knex('flats').where('id', id).del();
      if (!count) return res.status(404).json({ error: 'Piso no encontrado' });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al borrar piso' });
    }
  };
  
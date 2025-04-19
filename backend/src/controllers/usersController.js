// src/controllers/usersController.js
exports.createUser = async (knex, req, res) => {
    try {
      const { name, instagram_handle, role } = req.body;
      if (!name || !instagram_handle || !role) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const [user] = await knex('users')
        .insert({ name, instagram_handle, role })
        .returning(['id', 'name', 'instagram_handle', 'role', 'created_at']);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  };
  
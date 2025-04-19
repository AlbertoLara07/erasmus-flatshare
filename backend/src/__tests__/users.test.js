// src/__tests__/users.test.js
const request = require('supertest');
const app = require('../index'); // ajusta si tu index.js está en otra ruta

describe('Users API', () => {
  it('POST /api/users → crea un usuario y devuelve 201 y JSON', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Prueba Jest',
        instagram_handle: 'jest_test',
        role: 'buscador'
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Prueba Jest');
    expect(res.body.instagram_handle).toBe('jest_test');
    expect(res.body.role).toBe('buscador');
  });
});

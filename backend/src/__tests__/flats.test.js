// src/__tests__/flats.test.js
const request = require('supertest');
const app = require('../index');

describe('Flats API', () => {
  let userId;
  let flatId;

  // Crear un usuario antes de los tests de flats
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Host Jest', instagram_handle: 'jest_host', role: 'anfitrión' })
      .set('Accept', 'application/json');
    userId = res.body.id;
  });

  it('GET /api/flats → debería empezar vacío', async () => {
    const res = await request(app).get('/api/flats');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  it('POST /api/flats → crea un piso', async () => {
    const payload = {
      host_id: userId,
      title: 'Test Flat',
      description: 'Desc Jest',
      price: 123.45,
      total_spots: 2,
      whatsapp_invite: 'https://chat.whatsapp.com/jest'
    };
    const res = await request(app)
      .post('/api/flats')
      .send(payload)
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(payload.title);
    flatId = res.body.id;
  });

  it('GET /api/flats/:id → devuelve el piso creado', async () => {
    const res = await request(app).get(`/api/flats/${flatId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', flatId);
    expect(res.body).toHaveProperty('host_id', userId);
  });
});

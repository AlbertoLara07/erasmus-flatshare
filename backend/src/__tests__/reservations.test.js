// src/__tests__/reservations.test.js
const request = require('supertest');
const app = require('../index');

describe('Reservations API', () => {
  let userId;
  let flatId;
  let reservationId;

  beforeAll(async () => {
    // Crear un usuario buscador
    const userRes = await request(app)
      .post('/api/users')
      .send({ name: 'Guest Jest', instagram_handle: 'jest_guest', role: 'buscador' })
      .set('Accept', 'application/json');
    userId = userRes.body.id;

    // Crear un usuario anfitrión
    const hostRes = await request(app)
      .post('/api/users')
      .send({ name: 'Host Jest', instagram_handle: 'jest_host2', role: 'anfitrión' })
      .set('Accept', 'application/json');
    const hostId = hostRes.body.id;

    // Crear un piso
    const flatRes = await request(app)
      .post('/api/flats')
      .send({
        host_id: hostId,
        title: 'Flat for Reservation',
        description: 'Test',
        price: 200,
        total_spots: 1,
        whatsapp_invite: ''
      })
      .set('Accept', 'application/json');
    flatId = flatRes.body.id;
  });

  it('POST /api/flats/:id/reserve → crea una reserva', async () => {
    const res = await request(app)
      .post(`/api/flats/${flatId}/reserve`)
      .send({ user_id: userId })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.flat_id).toBe(flatId);
    expect(res.body.user_id).toBe(userId);
    expect(res.body.status).toBe('en_reserva');
    reservationId = res.body.id;
  });

  it('GET /api/flats/:id/reservations → lista la reserva', async () => {
    const res = await request(app).get(`/api/flats/${flatId}/reservations`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id', reservationId);
    expect(res.body[0]).toHaveProperty('name', 'Guest Jest');
    expect(res.body[0]).toHaveProperty('instagram_handle', 'jest_guest');
  });

  it('PUT /api/reservations/:rid/accept → acepta la reserva', async () => {
    const res = await request(app).put(`/api/reservations/${reservationId}/accept`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'aceptado');
  });

  it('PUT /api/reservations/:rid/deny → deniega la reserva', async () => {
    // Primero creamos otra reserva para poder denegarla
    const res2 = await request(app)
      .post(`/api/flats/${flatId}/reserve`)
      .send({ user_id: userId })
      .set('Accept', 'application/json');
    const rid2 = res2.body.id;

    const res = await request(app).put(`/api/reservations/${rid2}/deny`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'denegado');
  });
});

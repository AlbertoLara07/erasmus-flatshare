/**
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('reservations', table => {
      table.increments('id').primary();
      table.integer('flat_id').unsigned().references('id').inTable('flats').onDelete('CASCADE');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.enu('status', ['aceptado','en_reserva','denegado']).defaultTo('en_reserva');
      table.timestamp('requested_at').defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param {import('knex').Knex} knex
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reservations');
  };
  
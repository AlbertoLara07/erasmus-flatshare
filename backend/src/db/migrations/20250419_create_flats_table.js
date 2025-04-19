/**
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('flats', table => {
      table.increments('id').primary();
      table.integer('host_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('title').notNullable();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.integer('total_spots').notNullable();
      table.string('whatsapp_invite');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param {import('knex').Knex} knex
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('flats');
  };
  
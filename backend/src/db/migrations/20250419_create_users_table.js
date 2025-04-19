/**
 * @param {import('knex').Knex} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('instagram_handle').notNullable();
      table.enu('role', ['buscador', 'anfitrión']).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param {import('knex').Knex} knex
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  
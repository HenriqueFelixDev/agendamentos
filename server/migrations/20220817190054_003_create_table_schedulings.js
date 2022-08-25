/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('schedulings', (table) => {
    table.increments('id').primary()
    table.string('description', 255).notNullable()
    table.integer('client_id').unsigned()
    table.datetime('start').notNullable()
    table.datetime('end').notNullable()
    table.decimal('price', 8, 2).notNullable()
    table.foreign('client_id').references('clients.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('schedulings')
};

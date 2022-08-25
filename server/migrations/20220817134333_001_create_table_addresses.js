/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('addresses', (table) => {
    table.increments('id').primary()
    table.string('street', 64).notNullable()
    table.string('number', 8).notNullable()
    table.string('neighborhood', 64).notNullable()
    table.string('zip_code', 11).notNullable()
    table.string('city', 32).notNullable()
    table.string('state', 2).notNullable()
    table.text('complement')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('addresses')
};

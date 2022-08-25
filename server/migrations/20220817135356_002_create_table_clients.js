/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('clients', (table) => {
    table.increments('id').primary()
    table.string('name', 64).notNullable()
    table.string('nickname', 32).nullable()
    table.integer('address_id').unsigned()
    table.foreign('address_id').references('addresses.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('clients')
};

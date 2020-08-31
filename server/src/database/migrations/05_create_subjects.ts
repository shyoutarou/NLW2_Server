import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('subjects', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('subjects');
}
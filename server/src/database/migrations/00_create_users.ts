import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('avatar').nullable();
    table.string('whatsapp').nullable();
    table.string('bio').nullable();
    table.string('email').notNullable();
    table.string('password').nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
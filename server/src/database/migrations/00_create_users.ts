import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('surname').nullable();
    table.string('avatar').nullable();
    table.string('whatsapp').nullable();
    table.string('bio').nullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('token_expires').nullable();
    table.string('password_token').nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
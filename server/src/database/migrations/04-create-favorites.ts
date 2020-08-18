import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable("favorites", table => {
        table.integer('user_id').notNullable()
        table.integer('favorite_id').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable("favorites")
}
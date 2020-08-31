import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('subjects').truncate()

  // Inserts seed entries
  await knex('subjects').insert(
    [
      'Artes',
      'Biologia',
      'Ciências',
      'Educação Física',
      'Física',
      'Geografia',
      'História',
      'Matemática',
      'Português',
      'Química',
    ].map((subject, index) => {
      return {
        id: index,
        nome: subject,
      }
    }),
  )
}

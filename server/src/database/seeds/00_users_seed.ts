import * as Knex from 'knex'
import { encryptPassword } from '../../models/UsersModel'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').truncate()

  // Inserts seed entries
  await knex('users').insert([
    {
      name: 'Ric',
      surname: 'Shik',
      whatsapp: '+5',
      email: 'ric@shik.com',
      avatar: 'https://avatars3.githubusercontent.com/u/66930143?s=460&u=9a46318c1563414a627c432d89b8ae53bf359430&v=4',
      bio: `Software developer, who likes to be in tune with the technology flow.`,
      password: await encryptPassword('123'),
    },
    {
      name: 'Mayk',
      surname: 'Brito',
      whatsapp: '+55XXXXXXX',
      email: 'maykbrito@gmail.com',
      avatar: 'https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4',
      bio: `An instructor focused on helping people start programming for web - #html #css #javascript #sql #react #nodejs #fullstack`,
      password: await encryptPassword('123'),
    },

    {
      name: 'Diego',
      surname: 'Schell Fernandes',
      whatsapp: '+55XXXXXXX',
      email: 'diego3g@gmail.com',
      avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4',
      bio: `CTO at @Rocketseat. Passionate about education and changing people's lives through programming.`,
      password: await encryptPassword('123)'),
    },
  ])
}

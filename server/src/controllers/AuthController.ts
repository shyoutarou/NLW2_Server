import { Request, Response } from 'express';
import db from '../database/connections';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import { MailtrapMailProvider } from '../providers/implementations/MailtrapMailProvider';
import Knex from 'knex';

function generateToken(params: any) {
  
  
    return jwt.sign(params, String(process.env.SECRET_KEY), {
      expiresIn: '20m',
    })
  }

function decodeToken(params: string): { email: string; password: string } {
  return jwt.decode(params) as { email: string; password: string }
}

  async function indexUserByEmail(
    email: string,
    transaction?: Promise<Knex.Transaction<any, any>>,
  ) {
    // @ts-ignore
    let trdb: Knex.QueryBuilder<TRecord, DeferredKeySelection<TRecord, never>[]>
  
    if (transaction) {
      trdb = (await transaction)('users')
    } else {
      trdb = db.table('users')
    }
  
    return trdb.select('*').where('email', email)
  }
 
  async function comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  export interface UserInterface {
    validated?: boolean
    validateToken?: string
    id?: number
    name?: string
    surname?: string
    avatar?: string
    bio?: string
    email?: string
    whatsapp?: string
    password?: string
  }



export default class AuthController {

    async authenticate(request: Request, response: Response) {
        let { email, password } = request.body
        try {
          let storedUser
          let hashPassword
    
            storedUser = (await indexUserByEmail(email))[0] as UserInterface

            if (!(await comparePassword(password, storedUser.password as string))) {
                return response.status(403).json({ error: 'Senha inválida.' })
            }
    
          if (!storedUser) {
            return response.status(404).json({ error: 'Não existe esse usuário.' })
          }
    
          const { name, surname, id, avatar } = storedUser
          response.json({
            token: generateToken({ id }),
            refresh_token: generateToken({ email, password: storedUser.password }),
            user: {
              avatar,
              name,
              surname,
              email,
              id,
            },
          })
        } catch (e) {

          return response
            .status(400)
            .json({ error: 'Não foi possível executar a autenticação.' })
        }
}



  async loginUser(request: Request, response: Response) {
   
    try {

      const { email, password } = request.body

      if (!email || !password) return response.status(400) //400 Bad Request
      .json({ success: false, error: 'Informe o email e password' });

      const user = await db('users').where({ email })

      if(!user[0]) {
            return response.status(404).send('Usuário não cadastrado') //404 Not Found
        }

      if(!await bcrypt.compare(password, user[0].password)) {
          return response.status(401).send('Usuário ou senha incorretos') //401 Unauthorized
      }

      delete user[0].password
      const token = generateToken({ id: user[0].id })
      // const token = jwt.sign({ id: user[0].id }, 
      //   authConfig.jwt.key, 
      //   { expiresIn: authConfig.jwt.expiresIn })

      return response.status(200).json({ user: user[0], token }) //200 OK
    }
      catch (err) {
        return response.status(400).json({
            message: err.message || 'Erro inesperado no Login.' //400 Bad Request
        })
    }
  }

  async forgotPassword(request: Request, response: Response) {

    const { email } = request.body

    try {

        const user = await db('users').where({ email })

        if(!user[0]) {
            return response.status(404).send('Usuário não cadastrado') //404 Not Found
        }

        const password_token = crypto.randomBytes(16).toString('hex')
        const token_expires = new Date()
        token_expires.setMinutes(token_expires.getMinutes() + 60)

        await db('users').where('email', email).update({
          password_token, token_expires
        })

        const mailProvider = new MailtrapMailProvider()

        const body = `<div style="background-color: #8257E5; width: 500px; height: 400px;">
                      <h1 style="color: white; font-size: 28px; text-align: center; padding: 40px;">Redefinição
                      de senha - Proffy</h1>
                      <h1 style="color: white; font-size: 20px; text-align: justify; padding: 0 24px;">Olá, ${user[0].name}!
                      Foi solicitada a redefinição da sua senha na nossa plataforma! Para prosseguir, clique no
                      botão abaixo e preencha os campos para completar o processo!</h1>
                      <a style="text-decoration: none;" href="${String(process.env.APP_WEB_URL)}/reset-password/${user[0].id}/${password_token}">
                          <div style="text-decoration: none; cursor: pointer; width: 197px; height: 56px; background-color: #04BF58; border-radius: 8px; margin: 0 auto;">
                              <p style="color: white; text-align: center; line-height: 56px;">Redefinir senha</p>
                          </div>
                      </a>
                      </div>`
        
          await mailProvider.sendMail({
            to: {
              name: user[0].name,
              email: email
            },      
            from: {
              name: 'Equipe do meu app',
              email: 'equipe@meuapp.com'
            },          
            subject: "Redefinição de Senha - Proffy", // Subject line
            text: "Foi solicitada a redefinição da sua senha na nossa plataforma! Para prosseguir, entre no link a seguir e preencha os campos: ", // plain text body
            body,
        })
        
        return response.status(200).send('Email enviado a sua conta') //200 OK
    }
    catch (err) {
        return response.status(400).json({
            message: err.message || 'Erro inesperado ao reiniciar password.' //400 Bad Request
        })
    }
}

async gerartokenTestes(request: Request, response: Response) {
    const { email } = request.body

    const user = await db('users').where({ email })

    if(!user[0]) {
        return response.status(404).send('Usuário não cadastrado') //404 Not Found
    }

    const token_expires = new Date()
    token_expires.setSeconds(token_expires.getSeconds() + 5)
    // token_expires.setHours(token_expires.getHours() + 48)

    const password_token = generateToken({ id: user[0].id })
    
    // const password_token = crypto.randomBytes(16).toString('hex')

    await db('users').where({ email })
      .update({ token_expires, password_token })

    return response.status(201).send('gerado token: ' + password_token + ' para:' + token_expires) //201 Created
  }

  async resetPassword(request: Request, response: Response) {
      const { password, token } = request.body
      const { id } = request.params

      const user = await db('users').where({ id  })

      if(!user[0]) {
        return response.status(404).send('Usuário não cadastrado') //404 Not Found
      }

      if(user[0].password_token !== token) {
          return response.status(401).send('Token inválido') //401 Unauthorized
      }

      if(user[0].token_expires < Date.now()) {
          return response.status(401).send('Token vencido') //401 Unauthorized
      }

      const hashpassword = await bcrypt.hash(password, 10)

      await db('users').where({ id }).update({
          password: hashpassword, password_token: null, token_expires: null
      })

      console.log("OKKKKK")

      return response.status(200).send('Password alterado com sucesso') //200 OK
  }

}
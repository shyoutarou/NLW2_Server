import { Request, Response } from 'express';
import db from '../database/connections';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import { uuid } from 'uuidv4'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import authConfig from '../config/auth';
import { MailtrapMailProvider } from '../providers/implementations/MailtrapMailProvider';

export default class AuthController {

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

      const token = jwt.sign({ id: user[0].id }, 
        authConfig.jwt.key, 
        { expiresIn: authConfig.jwt.expiresIn })

      return response.status(200).json({ user: user[0], token }) //200 OK
    }
      catch (err) {
        return response.status(400).json({
            message: err.message || 'Erro inesperado no Login.' //400 Bad Request
        })
    }
  }

  async resetPassword(request: Request, response: Response) {

    const { email } = request.body

    try {

        const user = await db('users').where({ email })

        if(!user[0]) {
            return response.status(404).send('Usuário não cadastrado') //404 Not Found
        }

        var password = uuid()
        password = password.substr(0, 8)

        const hash = await bcrypt.hash(password, 10)
        await db('users').where('email', email).update('password', hash)

        const mailProvider = new MailtrapMailProvider()

        const body = `<p> Sua nova senha é: ${password} </p>`
        console.log(password)
        console.log(user[0].name)
        console.log(email)
        await mailProvider.sendMail({
            to: {
                name: user[0].name,
                email: email
            },
            from: {
                name: 'Equipe do meu app',
                email: 'equipe@meuapp.com'
            },
            subject: 'Resetar senha da plataforma Proffy',
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
    token_expires.setHours(token_expires.getHours() + 48)

    const password_token = crypto.randomBytes(16).toString('hex')

    await db('users').where({ email })
      .update({ token_expires, password_token })

    return response.status(201).send('gerado token para:' + token_expires) //201 Created
  }


  async resetPassword_old(request: Request, response: Response) {
      const { email } = request.body

      const user = await db('users').where({
          email
      })

      if(!user[0]) {
        return response.status(404).send('Usuário não cadastrado') //404 Not Found
      }

      const password_token = crypto.randomBytes(16).toString('hex')

      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          secure: false,
          port: 587,
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      })

      await transporter.sendMail({
          from: '"Proffy" <x_kata@hotmail.com>', // sender address
          to: email,
          subject: "Redefinição de Senha - Proffy", // Subject line
          text: "Foi solicitada a redefinição da sua senha na nossa plataforma! Para prosseguir, entre no link a seguir e preencha os campos: ", // plain text body
          html: `<div style="background-color: #8257E5; width: 500px; height: 400px;">
              <h1 style="color: white; font-size: 28px; text-align: center; padding: 40px;">Redefinição
              de senha - Proffy</h1>
              <h1 style="color: white; font-size: 20px; text-align: justify; padding: 0 24px;">Olá, ${user[0].name}!
              Foi solicitada a redefinição da sua senha na nossa plataforma! Para prosseguir, clique no
              botão abaixo e preencha os campos para completar o processo!</h1>
              <a style="text-decoration: none;" href="http://localhost:3000/redefine-password/${user[0].id}/${password_token}">
                  <div style="text-decoration: none; cursor: pointer; width: 197px; height: 56px; background-color: #04BF58; border-radius: 8px; margin: 0 auto;">
                      <p style="color: white; text-align: center; line-height: 56px;">Redefinir senha</p>
                  </div>
              </a>
          </div>`
      })

      return response.status(200).send('token sent to your email')
  }

  async updatePassword(request: Request, response: Response) {
      const { new_pass, token } = request.body
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

      const password = await bcrypt.hash(new_pass, 10)

      await db('users').where({ id }).update({
          password, password_token: null, token_expires: null
      })

      return response.status(200).send('Password alterado com sucesso') //200 OK
  }

  async profileAuth(request: Request, response: Response) {
    try {
        const { user_id } = request.body

        const user = await db('users').where({ id: user_id })
        return response.json(user[0])
    }
    catch (err) {
        return response.status(400).json({
            message: err.message || 'Erro inesperado ao obter profile.' //400 Bad Request
        })
    }      
  }

  async updateImage(request: Request, response: Response) {
    try {
        const { id } = request.params
 
        const user = await db('users').where({id})
  
        if(!user[0]) {
            response.status(404).send('Usuário não cadastrado') //404 Not Found
        }

        await db('users').where({id}).update({
            avatar: request.file.filename
        })
  
        if(user[0].avatar !== 'default.png') {
            fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', user[0].avatar))
        }
  
        response.status(200).json({ avatar: request.file.filename })  //200 OK      
    }
    catch (err) {
        return response.status(400).json({
            message: err.message || 'Erro inesperado ao alterar imagem.' //400 Bad Request
        })
    }      
  }

  async updateProfile(request: Request, response: Response) {
    try {
        const { id } = request.params
        const { whatsapp, bio, name } = request.body
  
        await db('users').where({id}).update({
            whatsapp, name, bio
        })
  
        return response.status(200).send('Usuário atualizado com sucesso!') //200 OK        
    }
    catch (err) {
        return response.status(400).json({
            message: err.message || 'Erro inesperado ao alterar profile.' //400 Bad Request
        })
    }      
  }
}
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

  async loginUser(req: Request, res: Response) {
   
    try {

      const { email, password } = req.body

      if (!email || !password) return res.status(400)
      .json({ success: false, error: 'Informe o email e password' });

      const user = await db('users').where({
          email
      })

      if(!user[0]) {
          return res.status(400).send('Usuário ou senha incorretos')
      }

      if(!await bcrypt.compare(password, user[0].password)) {
          return res.status(401).send('Usuário ou senha incorretos')
      }

      delete user[0].password

      const token = jwt.sign({ id: user[0].id }, 
        authConfig.jwt.key, 
        { expiresIn: authConfig.jwt.expiresIn })

      return res.status(200).json({ user: user[0], token })

    } catch(err) {
        return res.status(400).json({error: "login unexpected error"})
    }
  }

  async resetPassword(request: Request, response: Response) {

    const { name, email } = request.body

    try {
        const userAlreadyExists = await db('users').where('email', email).select('*').first()

        if (!userAlreadyExists) {
            throw new Error("User don't exists.")
        }

        var password = uuid()
        password = password.substr(0, 8)

        const hash = await bcrypt.hash(password, 10)
        await db('users').where('email', email).update('password', hash)

        const mailProvider = new MailtrapMailProvider()

        const body = `<p> Sua nova senha é: ${password} </p>`
        console.log(password)
        console.log(name)
        console.log(email)
        await mailProvider.sendMail({
            to: {
                name: name,
                email: email
            },
            from: {
                name: 'Equipe do meu app',
                email: 'equipe@meuapp.com'
            },
            subject: 'Resetar senha da plataforma Proffy',
            body,
        })
        
        return response.status(200).send('Email enviado a sua conta')
    }
    catch (err) {
        return response.status(400).json({
            message: err.message || 'Unexpected error.'
        })
    }
}

  async resetPassword_old(req: Request, res: Response) {
      const { email } = req.body

      const user = await db('users').where({
          email
      })

      if(!user[0]) {
          return res.status(404).send('user not found')
      }


      const token_expires = new Date()
      token_expires.setHours(token_expires.getHours() + 1)

      const password_token = crypto.randomBytes(16).toString('hex')

      await db('users').where({
          email
      }).update({
          token_expires,
          password_token
      })

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

      return res.status(200).send('token sent to your email')
  }

  async updatePassword(req: Request, res: Response) {
      const { new_pass, token } = req.body
      const { id } = req.params

      const user = await db('users').where({
          id
      })

      if(!user[0]) {
          return res.status(404).send('user not found')
      }

      if(user[0].password_token !== token) {
          return res.status(400).send('invalid token')
      }

      if(user[0].token_expires < Date.now()) {
          return res.status(400).send('token expired')
      }

      const password = await bcrypt.hash(new_pass, 10)

      await db('users').where({
          id
      }).update({
          password,
          password_token: null,
          token_expires: null
      })

      return res.status(200).send('password updated successfully')
  }

  async profileAuth(req: Request, res: Response) {
      const user = await db('users').where({ id: req.body.userId.id })
      return res.json(user[0])
  }

  async updateImage(req: Request, res: Response) {
      const { id } = req.params

      const user = await db('users').where({id})

      if(!user[0]) {
          res.status(404).send('user not found')
      }

      await db('users').where({id}).update({
          avatar: req.file.filename
      })

      if(user[0].avatar !== 'default.png') {
          fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', user[0].avatar))
      }

      res.status(200).json({ avatar: req.file.filename })
  }

  async updateProfile(req: Request, res: Response) {
      const { id } = req.params
      const { whatsapp, bio, name, cost, subject } = req.body

      await db('users').where({id}).update({
          whatsapp, cost, name, bio, subject
      })

      return res.status(201).send('usuario atualizado com sucesso!')
  }
}
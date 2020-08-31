import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';
import db from '../database/connections'

export default class UsersController {

    async listUsers(request: Request, response: Response) {
        try {

            const users = await db('users')
    
            if(users.length === 0) {
                return response.json([])
            }  

            return response.json(users)    
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado ao listar usuários" //400 Bad Request
            })
        }                      
    }

    
    async getDataUser(request: Request, response: Response) {

        const { user_id } = request.params
    
        const data_user = await db('users').where('users.id', user_id)
            .join('classes', 'classes.user_id', '=', 'users.id')
            .select('users.*', 'classes.*').first()
        
        data_user.password = undefined
        data_user.avatar = `${String(process.env.APP_API_URL)}/uploads/${data_user.avatar}`

        return response.json(data_user)
    }
    
    async createUser(request: Request, response: Response) 
    {
        try {
           
            const { name, email, whatsapp, 
                bio, password: uncryptedPass, 
                avatar } = request.body

            if (!name || !email || !uncryptedPass) return response.status(400)
            .json({ success: false, error: 'Informe o nome, email and password' });
    
            const [emailExists] = await db('users').where('email', '=', email);
  
            if (emailExists) return response.status(400)
            .json({ success: false, message: 'Email já cadastrado' });
        
            const salt =  await bcrypt.genSalt(10);
            const password = await bcrypt.hash(uncryptedPass, salt)

            await db('users').insert({
                name, email, whatsapp, 
                bio, password, 
                avatar
            })

            return response.status(201).send('Usuário criado com sucesso!') //201 Created
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado ao criar user" //400 Bad Request
            })
        }
    }

    async deleteUser(request: Request, response: Response) {
        try {
          const { id } = request.params

          const user = await db('users').where({ id })

          if(!user[0]) {
                return response.status(404).send('Usuário não cadastrado') //404 Not Found
          }

          await db('users').where({id}).delete()

          response.status(200).send('Usuário deletado com sucesso') //200 OK
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado ao excluir user" //400 Bad Request
            })
        }            
      }


}
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';
import db from '../database/connections'

export default class UsersController {

    async createUser(request: Request, response: Response) 
    {
        try {
           
            

            const { name, email, whatsapp, 
                bio, password: uncryptedPass, 
                avatar, subject } = request.body

            if (!name || !email || !uncryptedPass) return response.status(400)
            .json({ success: false, error: 'Informe o nome, email and password' });
    

            const salt =  await bcrypt.genSalt(10);
            const password = await bcrypt.hash(uncryptedPass, salt)

            await db('users').insert({
                name, email, whatsapp, 
                bio, password, 
                avatar, subject
            })

            return response.status(201).send('Usuário criado com sucesso!')
        
        } catch (error) {
            return response.status(400).json({
            error: "Unexpected error in create user" 
            })
        }
    }
}
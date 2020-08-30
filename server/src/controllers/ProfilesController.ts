import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import db from '../database/connections';

export default class ProfilesController {

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

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const user = await db('users').select().where({ id });

    if (!user[0]) {
      return response.status(404).json({ error: 'User not found' });
    }

    const { name, whatsapp, bio, subject, cost } = request.body;

    const trx = await db.transaction();

    try {
      await trx('users').where({ id }).update({
        name,
        whatsapp,
        bio,
      });

      await trx('classes').where({ user_id: id }).update({
        subject,
        cost,
      });

      await trx.commit();

      const updatedUser = await db('users').select().where({ id });

      return response.status(200).json(updatedUser[0]);
    } catch (error) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while updating profile',
      });
    }
  }

  async updateAvatar(request: Request, response: Response) {
    const { id } = request.params;

    const user = await db('users').select().where({ id });

    if(!user[0]) {
        response.status(404).send('Usuário não cadastrado') //404 Not Found
    }

    await db('users').where({ id }).update({
      avatar: request.file.filename,
    });

    if (user[0].avatar) {
      const file = path.resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        user[0].avatar,
      );

      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }

    const updatedUser = await db('users').select().where({ id });

    return response.status(200).json(updatedUser[0]);
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

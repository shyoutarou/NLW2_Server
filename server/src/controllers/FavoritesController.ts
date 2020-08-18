import { Request, Response } from 'express'
import db from '../database/connections'

export default class FavoritesController {

    async listFavorite(request: Request, response: Response) {
        try {
            const { user_id } = request.query

            if (!user_id) return response.status(400) //400 Bad Request
            .json({ success: false, error: 'Informe o usuário' });

            const favorites = await db('favorites').where({ user_id })

            if(favorites.length === 0) {
                return response.json([])
            }  
    
            const idsArray = favorites.map(favorite => favorite.user_id)
    
            var query = ''
    
            idsArray.forEach((id, index) => {
                if(index === 0) {
                    query = query+'`users`.`id` = '+`${id}`+' '
                } else {
                    query = query+'OR `users`.`id` = '+`${id}`+' '
                }
            })
    
            const users = await db('users').whereRaw(query)
            return response.json(users)    
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado ao criar favorite" //400 Bad Request
            })
        }                      
    }

    async createFavorite(request: Request, response: Response) {
        try {
            const { user_id, favorite_id } = request.body
            await db('favorites').insert({
                user_id,
                favorite_id
            })
            response.status(201).send('Favoritado com sucesso!') //201 Created
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado ao criar favorite" //400 Bad Request
            })
        }                    
    }

    async deleteFavorite(request: Request, response: Response) {
        try {
            const { user, favorite } = request.params
            await db('favorites').where({
                user_id: user, favorite_id: favorite
            }).delete()
            response.status(200).send('Favorito excluido!') //200 OK    
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado ao excluir favorite" //400 Bad Request
            })
        }                      
    }

}
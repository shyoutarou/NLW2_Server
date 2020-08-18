import { Request, Response } from 'express'
import db from '../database/connections'

export default class FavoritesController {
    async createFavorite(req: Request, response: Response) {
        try {
            const { user_id, favorite_id } = req.body
            await db('favorites').insert({
                user_id,
                favorite_id
            })
            response.status(201).send('Favoritado com sucesso!')
        } catch (error) {
            return response.status(400).json({
            error: "Unexpected error in create class" 
            })
        }        
    }

    async deleteFavorite(request: Request, response: Response) {
        try {
            const { user, favorite } = request.params
            await db('favorites').where({
                user_id: user, favorite_id: favorite
            }).delete()
            response.status(201).send('Favorito excluido!')        
        } catch (error) {
            return response.status(400).json({
            error: "Unexpected error in delete favorite" 
            })
        }        
    }

    async listFavorite(request: Request, response: Response) {
        try {
            const { user_id } = request.query
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
        } catch (error) {
            return response.status(400).json({
            error: "Unexpected error in create user" 
            })
        }        
    }
}
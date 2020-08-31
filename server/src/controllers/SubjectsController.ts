import { Request, Response } from 'express'
import db from '../database/connections'

export default class SubjectsController {

    async listSubjects(request: Request, response: Response) {
        try {

            const subjects = await db('subjects')
            .select('subjects.id', 'subjects.nome as value');
   
            if(subjects.length === 0) {
                return response.json([])
            }  

            return response.json(subjects)    
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || "Erro inesperado ao listar matérias" //400 Bad Request
            })
        }                      
    }
}
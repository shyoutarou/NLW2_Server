import { Request, Response } from 'express';

import db from '../database/connections';

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    try {
      const totalConnections = await db('connections').count('* as total');

      const { total } = totalConnections[0];
  
      return response.json({ total });     
    }
    catch (err) {
        return response.status(400).json({
            message: err.message || "Erro inesperado ao obter connections" //400 Bad Request 
        })
    }              
  }

  async create(request: Request, response: Response) {
    try {
      const { user_id } = request.body;

      await db('connections').insert({
        user_id,
      });
  
      return response.status(201).send();  //201 Created
    }
    catch (err) {
        return response.status(400).json({
            message: err.message || "Erro inesperado ao criar connection" //400 Bad Request
        })
    }                
  }
}
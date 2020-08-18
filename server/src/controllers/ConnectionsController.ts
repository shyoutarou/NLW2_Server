import { Request, Response } from 'express';

import db from '../database/connections';

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    try {
      const totalConnections = await db('connections').count('* as total');

      const { total } = totalConnections[0];
  
      return response.json({ total });        
    } catch (error) {
        return response.status(400).json({
        error: "Unexpected error in get connections" 
        })
    }    
  }

  async create(request: Request, response: Response) {
    try {
      const { user_id } = request.body;

      await db('connections').insert({
        user_id,
      });
  
      return response.status(201).send();        
    } catch (error) {
        return response.status(400).json({
        error: "Unexpected error in create connection" 
        })
    }    
  }
}
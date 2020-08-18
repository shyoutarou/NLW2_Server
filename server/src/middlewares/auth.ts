import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/auth';

export default (request: Request, response: Response, next: NextFunction) => {
  if(!request.headers.authorization) {
      return response.status(401).send('Sem token!') //401 Unauthorized
  }

  const token = request.headers.authorization.split(' ')

  if(token[0] !== 'Bearer') {
      return response.status(401).send('Formato de token invalido!') //401 Unauthorized
  }

  jwt.verify(token[1], authConfig.jwt.key, (err, decoded) => {
      if(err) {
        return response.status(401).json({
            message: err.message || "Token invalido" //401 Unauthorized
        })          
      }
      request.body.userId = decoded as any
      next()
  })
}

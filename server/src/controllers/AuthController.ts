import { Request, Response } from 'express';
import db from '../database/connections';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default class AuthController {

  async register(request: Request, response: Response) {
      const {
        name,
        surname,
        email,
        password
      } = request.body;

      if (!name || !surname || !email || !password) return response.status(400).json({ success: false, error: 'Please provide an name, avatar, whatsapp, bio, email and password' });
  
      const [emailExists] = await db('users').where('email', '=', email);
  
      if (emailExists) return response.status(400).json({ success: false, error: 'Email already exists' });
  
      const salt =  await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      try {
          const insertedUsersIds = await db('users').insert({
            name,
            surname,
            email,
            password: hashedPassword
          });
        
          const user_id = insertedUsersIds[0];

          var token = jwt.sign({ id: user_id }, 'shhhhh');

          return response.header('auth-token', token).json({ success: true, user_id, access_token: token });
      } catch (error) {
          // console.log(error);
          return response.status(400).json({
          error: "Unexpected error" 
      })       
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) return response.status(400).json({ success: false, error: 'Please provide an email and password' });

    try {
          const [user] = await db('users').where('email', '=', email);
      
          if (!user) return response.status(400).json({ success: false, error: 'User doesn\'t exists' });
      
          const validPassword = await bcrypt.compare(password, user.password);
      
          if (!validPassword) return response.status(400).json({ success: false, error: 'Password doesn\'t match' });

          const token = jwt.sign({ user_id: user.id }, 'shhhhh');
      
          return response.header('auth-token', token).json({ success: true, name:  user.name, email: user.email, access_token: token });
        } catch (error) {
          // console.log(error);
          return response.status(400).json({
          error: "Unexpected error" })  
        }
    }
}
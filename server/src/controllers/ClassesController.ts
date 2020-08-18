import { Request, Response } from 'express';

import db from '../database/connections';
import { convertHoursToMinutes } from '../utils/convertHourtToMinuts';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
  }

export default class ClassesController {

    async index(req: Request, res: Response) {
      try {
        const filters = req.query;
    
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
    
        if (!filters.week_day || !filters.subject || !filters.time) {
          return res.status(400).json({
            error: 'Missing filters to search classes'
          });
        }
    
        const timeInMinutes = convertHoursToMinutes(time);
    
        const classes = await db('classes')
          .whereExists(function() {
            this.select('class_schedule.*')
              .from('class_schedule')
              .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
              .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
              .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
              .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
          })
          .where('classes.subject', '=', subject)
          .join('users', 'classes.user_id', '=', 'users.id')
          .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
          .select(['classes.*', 'users.*']);
    
        return res.json(classes);        
      } catch (error) {
          return res.status(400).json({
          error: "Unexpected error in list classes" 
          })
      }      
    }


    async create(request: Request, response: Response){

        const {subject, cost, schedule, user_id} = request.body;

        const trx = await db.transaction();

        try {
        
        const insertedclassIds = await trx('classes').insert({
            subject, cost,
            user_id
        });
    
        const class_id = insertedclassIds[0];
    
        const classSchedule = schedule.map((scheduleitem: ScheduleItem) => {
          
          const { week_day, from, to } = scheduleitem
          
          return {
              week_day: week_day,
              from: convertHoursToMinutes(from),
              to: convertHoursToMinutes(to),
              class_id
          };
        })
    
        await trx('class_schedule').insert(classSchedule);
    
        await trx.commit();

        return response.status(201).send('classe cadastrada')
        
        } catch (error) {
                trx.rollback();
                // console.log(error);
                return response.status(400).json({
                error: "Unexpected error in create class" 
            })
            
        }
    }

    async userClasses(request: Request, response: Response) {
      try {
        const { id } = request.params

        const classes = await db('classes').where({ user_id: id })
        .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')

        response.status(201).json(classes)        
      } catch (error) {
          return response.status(400).json({
          error: "Unexpected error in list class" 
          })
      }      
    }

    async deleteClass(request: Request, response: Response) {
      try {
        const { id } = request.params
        await db('classes').where({id}).delete()
        response.status(201).send('classe deletada com sucesso')
      } catch (error) {
          return response.status(400).json({
          error: "Unexpected error in delete class" 
          })
      }    
    }

}

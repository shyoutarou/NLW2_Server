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
          .select(['classes.*', 'users.*']);
    
        return res.json(classes);
      }


    async create(request: Request, response: Response){

        const {
            name, surname, email, avatar, whatsapp, bio,
            subject, cost, schedule,
        } = request.body;

        const trx = await db.transaction();

        try {
            const insertedIds =  await trx('users').insert({
            name, surname, email, avatar,
            whatsapp, bio
            });
    
        const user_id = insertedIds[0];
    
        const insertedclassIds = await trx('classes').insert({
            subject, cost,
            user_id
        });
    
        const class_id = insertedclassIds[0];
    
        const classSchedule = schedule.map((scheduleitem: ScheduleItem) => {
            return {
                week_day: scheduleitem.week_day,
                from: convertHoursToMinutes(scheduleitem.from),
                to: convertHoursToMinutes(scheduleitem.to),
                class_id
            };
            })
    
        await trx('class_schedule').insert(classSchedule);
    
        trx.commit();

        return response.status(201).send();
        } catch (error) {
            trx.rollback();
            // console.log(error);
            return response.status(400).json({
            error: "Unexpected error" 
            })
            
        }
    

        return response.send()
    }
}

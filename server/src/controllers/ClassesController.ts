import { Request, Response } from 'express';

import db from '../database/connections';
import { convertHoursToMinutes } from '../utils/convertHourtToMinuts';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
  }

export default class ClassesController {

    async index(requerst: Request, response: Response) {
      try {
        const filters = requerst.query;
    
        const subject_id = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
    
        if (!filters.week_day || !filters.subject || !filters.time) {
          return response.status(400).json({
            error: 'Informe o dia da semana, a matéria e o horário'
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
          .where('classes.subject_id', '=', subject_id)
          .join('users', 'classes.user_id', '=', 'users.id')
          .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
          .select(['classes.*', 'users.*']);
    


        return response.json(classes);    
      }
      catch (err) {
          return response.status(400).json({
              message: err.message || "Erro inesperado ao criar class" //400 Bad Request
          })
      }                    
    }


    async create(request: Request, response: Response){

        const {subject_id, cost, summary, schedule, user_id} = request.body;

        const trx = await db.transaction();

        try {
        
        const insertedclassIds = await trx('classes').insert({
            subject_id, cost, summary,
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

        return response.status(201).send('classe cadastrada') //201 Created

      }
      catch (err) {
          return response.status(400).json({
              message: err.message || "Erro inesperado ao criar class" //400 Bad Request 
          })
      }          
    }

    async userClasses(request: Request, response: Response) {
      try {
        const { id } = request.params

        const classes = await db('classes').where({ user_id: id })
        .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')

        response.status(200).json(classes)  //200 OK    
      }
      catch (err) {
          return response.status(400).json({
              message: err.message || "Erro inesperado na listagem de class" //400 Bad Request
          })
      }                 
    }

    async deleteClass(request: Request, response: Response) {
      try {
        const { id } = request.params

        const classe = await db('classes').where({ id: id })

        if(!classe[0]) {
           return response.status(404).send('Classe não cadastrada') //404 Not Found
        }

        await db('classes').where({id}).delete()

        response.status(200).send('Classe deletada com sucesso') //200 OK
      }
      catch (err) {
          return response.status(400).json({
              message: err.message || "Erro inesperado ao excluir class" //400 Bad Request
          })
      }            
    }

    async allteachers(request: Request, response: Response) {
      const { id } = request.params;
  
      const teachers = await db('classes')
        .countDistinct('classes.user_id as total');
  
        const { total } = teachers[0];
  
        return response.status(200).json({ total });   
    }

    async showSchedules(request: Request, response: Response) {
      const { id } = request.params;
  
      const classes = await db('classes')
        .where({ user_id: id })
        .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
        .select('class_schedule.id', 'classes.id as class_id', 'week_day', 'from', 'to');
  
      return response.status(200).json(classes);
    }

    async showSubjects(request: Request, response: Response) {
      const { id } = request.params;

      const classes = await db('classes')
        .where({ user_id: id })
        .join('subjects', 'classes.subject_id', '=', 'subjects.id')
        .select('classes.id', 'subjects.nome as value', 'classes.cost');

      return response.status(200).json(classes);
    }

    async deleteClassSchedule(request: Request, response: Response) {
      try {
        const { id } = request.params

        const classe = await db('class_schedule').where({ id: id })

        if(!classe[0]) {
           return response.status(404).send('Horário da classe não cadastrada') //404 Not Found
        }

        await db('class_schedule').where({id}).delete()

        response.status(200).send('Horário da classe deletada com sucesso') //200 OK
      }
      catch (err) {
          return response.status(400).json({
              message: err.message || "Erro inesperado ao excluir horário" //400 Bad Request
          })
      }            
    }    

}

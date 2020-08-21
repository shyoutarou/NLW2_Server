import express from 'express';

import AuthController from './controllers/AuthController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import FavoritesController from './controllers/FavoritesController';
import UsersController from './controllers/UsersController';
import multer from 'multer';
import multerConfig from './config/multerConfig'
import auth from './middlewares/auth'

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

const authController = new AuthController();
const favoritesController = new FavoritesController();
const usersController = new UsersController();

const upload = multer(multerConfig)

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

routes.get('/users', usersController.listUsers)
routes.post('/users', usersController.createUser)
routes.delete('/users/:id', usersController.deleteUser)

routes.post('/gerartoken', authController.gerartokenTestes)
routes.post('/auth', authController.loginUser)
routes.post('/profile', auth, authController.profileAuth)
routes.post('/resetpassword', authController.resetPassword)

routes.put('/auth/image/:id', upload.single('avatar'), authController.updateImage)
routes.put('/profilesupdate/:id', authController.updateProfile)
routes.put('/updatePassword/:id', authController.updatePassword)

routes.get('/classes', classesController.index)
routes.get('/classes/:id', classesController.userClasses)
routes.post('/classes', classesController.create)
routes.delete('/classes/:id', classesController.deleteClass)
routes.delete('/classesschedule/:id', classesController.deleteClassSchedule)

routes.get('/favorites/', favoritesController.listFavorite)
routes.post('/favorites/', favoritesController.createFavorite)
routes.delete('/favorites/:user/:favorite', favoritesController.deleteFavorite)

export default routes;
import express from 'express';

import AuthController from './controllers/AuthController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import FavoritesController from './controllers/FavoritesController';
import UsersController from './controllers/UsersController';
import multer from 'multer';
import multerConfig from './config/multerConfig'
import auth from './middlewares/auth'
import ProfilesController from './controllers/ProfilesController';

const routes = express.Router();


const connectionsController = new ConnectionsController();

const usersController = new UsersController();
const authController = new AuthController();

const profilesController = new ProfilesController();

const classesController = new ClassesController();
const favoritesController = new FavoritesController();


const upload = multer(multerConfig)

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

routes.get('/users', auth, usersController.listUsers)
routes.post('/users', auth, usersController.createUser)
routes.delete('/users/:id', auth, usersController.deleteUser)


routes.post('/authenticate', authController.authenticate)


routes.post('/gerartoken', authController.gerartokenTestes)
routes.post('/auth', authController.loginUser)
routes.post('/resetpassword', authController.resetPassword)
routes.put('/updatePassword/:id', authController.updatePassword)

routes.put('/profiles/avatar/:id', upload.single('avatar'), profilesController.updateImage)
routes.post('/profile', auth, profilesController.profileAuth)
routes.put('/profilesupdate/:id', auth, profilesController.updateProfile)

routes.get('/classes', auth, classesController.index)
routes.get('/classes/:id', auth, classesController.userClasses)
routes.post('/classes', auth, classesController.create)
routes.get('/allteachers', auth, classesController.allteachers)
routes.get('/showSubjects/:id', auth, classesController.showSubjects)
routes.get('/showSchedules/:id', auth, classesController.showSchedules)
routes.delete('/classes/:id', auth, classesController.deleteClass)
routes.delete('/classesschedule/:id', auth, classesController.deleteClassSchedule)

routes.get('/favorites/', auth, favoritesController.listFavorite)
routes.post('/favorites/', auth, favoritesController.createFavorite)
routes.delete('/favorites/:user/:favorite', auth, favoritesController.deleteFavorite)

export default routes;
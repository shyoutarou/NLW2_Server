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

routes.post('/users', usersController.createUser)

routes.post('/profiles', authController.loginUser)
routes.post('/auth', auth, authController.profileAuth)
routes.post('/profiles/resetpassword', authController.resetPassword)

routes.put('/profiles/image/:id', upload.single('avatar'), authController.updateImage)
routes.put('/profilesupdate/:id', authController.updateProfile)
routes.put('/profiles/resetpassword/:id', authController.updatePassword)

routes.get('/classes', classesController.index)
routes.get('/classes/:id', classesController.userClasses)
routes.post('/classes/:id', classesController.create)
routes.delete('/classes/:id', classesController.deleteClass)

routes.get('/favorites/:user', favoritesController.listFavorite)
routes.post('/favorites/:user/:favorite', favoritesController.createFavorite)
routes.delete('/favorites/:user/:favorite', favoritesController.deleteFavorite)

export default routes;
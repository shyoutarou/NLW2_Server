import express from 'express';

import AuthController from './controllers/AuthController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AccountController from './controllers/AccountController';

const routes = express.Router();

const authController = new AuthController();
const accountControllers = new AccountController();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
routes.get("/classes", classesController.index);
routes.post("/classes", classesController.create);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

routes.get('/users', authController.users);
routes.post('/register', authController.register);
routes.post('/login', authController.login);



export default routes;
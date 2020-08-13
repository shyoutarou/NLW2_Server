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

routes.post('/register', authController.register);
routes.post('/login', authController.login);

routes.get('/accounts', accountControllers.getToken);
routes.get('/accounts/credentials', accountControllers.getCredentials);
routes.post('/accounts', accountControllers.createAccount);

export default routes;
import express from 'express';
import cors from 'cors';
import routes from './routes';

require('dotenv').config()
console.log(require('dotenv').config())
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
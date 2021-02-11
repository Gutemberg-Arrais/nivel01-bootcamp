import express from 'express';

import HelloWorld from './routes';
const api = express();

api.get('/', HelloWorld )

api.listen(5000)
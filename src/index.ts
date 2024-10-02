import express from 'express';
import { logger } from './helpers/logger';
import cors from 'cors';
import http from 'http';
import "./config/databases";
import { insertUsersIfNotExists } from './models/Users';
import { insertBooksIfNotExists } from './models/Books';

//config
const app  = express();
const port = process.env.PORT || 3000;

//use cors origin
app.use(cors({
    credentials: true,
}));

// extraction to json
app.use(express.json());

// running server
const server = http.createServer(app);
server.listen(port, () => {
    logger.info('Server running on http://localhost:8080/');
});

//fist time config the database member and book insert if data isn;t exists
insertUsersIfNotExists().then(() => {
    logger.info('Members insertion / checking process completed !!!.');
});

insertBooksIfNotExists().then(() => {
    logger.info('Books insertion / checking process completed !!!.');
});


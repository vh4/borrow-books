import express from 'express';
import { logger } from './helpers/logger';
import cors from 'cors';
import http from 'http';
import "./config/databases";
import { insertUsersIfNotExists } from './models/Users';
import { insertBooksIfNotExists } from './models/Books';
import Api from './routes/api'

//swagger
import swaggerjsdocs from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

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
    logger.info(`Server running on http://localhost:${port}/`);
});

//fist time config the database member and book insert if data isn;t exists
insertUsersIfNotExists().then(() => {
    logger.info('Members insertion / checking process completed !!!.');
});

insertBooksIfNotExists().then(() => {
    logger.info('Books insertion / checking process completed !!!.');
});


app.use('/api', Api);

// Swagger options
const options = {
	definition: {
	  openapi: '3.0.0',
	  info: {
		title: 'API Documentation Borrow Books',
		version: '1.0.0',
	  },
	  servers: [
		{
		  url: `http://localhost:${port}/`,
		},
	  ],
	},
	apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to your route/controller files for Swagger to auto-generate docs
};
  
  // Generate swagger docs
  const swaggerSpec = swaggerjsdocs(options);
  
  // Swagger UI setup
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


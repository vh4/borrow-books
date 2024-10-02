import { logger } from '../helpers/logger';
import mongoose, { Connection } from 'mongoose';

const MONGO_URL: string = 'mongodb+srv://fathoniwasesojati:banglaribang@cluster0.6sob1.mongodb.net/?retryWrites=true&w=majority&appName=borrow_books'; // DB URI

mongoose.connect(MONGO_URL)
  .then(() => {
    logger.info('Successfully connected to the database!');
  })
  .catch((err) => {
    logger.error('Error connecting to the database!', err);
  });

const db: Connection = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connection'));
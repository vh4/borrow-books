import mongoose, { Document, Model } from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../helpers/logger';

// Define an interface for the IBook document.
interface IBook extends Document {
  code: string;
  title:string;
  author:string;
  stock:number;
}

// Define IBook schema with typing.
const BooksSchema = new mongoose.Schema<IBook>({
  code: {
    type: String,
    required: true,
    unique: true 
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

// Create a model from the schema with the correct typing.
const BookModel: Model<IBook> = mongoose.model<IBook>('books', BooksSchema);

const insertBooksIfNotExists = async (): Promise<void> => {
  try {

    const filePath = path.resolve(__dirname, '../data/books.json');


    const fileData = await fs.readFile(filePath, 'utf-8');
    const members: Array<IBook> = JSON.parse(fileData);


    for (const member of members) {
      const { code, title, author, stock } = member;

      const existingUser = await BookModel.findOne({ code });

      if (!existingUser) {

        const newUser = new BookModel({ code, title, author, stock });
        await newUser.save();
        logger.info(`Book with code ${code} has been added.`);

      } else {

        logger.warn(`Book with code ${code} already exists.`);

      }
    }
  } catch (error) {

    logger.error('Error occurred while inserting users:', error);

  }
};

export { insertBooksIfNotExists, BookModel };

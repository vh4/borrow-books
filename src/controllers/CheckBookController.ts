import express, { Request, Response } from 'express'
import { BookModel } from '../models/Books';
import { logger } from '../helpers/logger';

export async function CheckBookController(req: Request, res: Response): Promise<any> {
	try {
	  const books = await BookModel.find({ stock: { $gt: 0 } });
	  res.status(200).json({
		response_code: '00',
		message:'Success',
		data:books
	  });
	} catch (error) {
	  logger.error(error);
	  res.status(500).json({ response_code:'68', message: 'An error occurred while fetching books' });
	}

};

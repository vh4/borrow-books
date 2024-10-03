import { Request, Response } from "express";
import { logger } from "../helpers/logger";
import { UserModel } from "../models/Users";
import { BorrowModel } from "../models/Borrow";
import { BookModel } from "../models/Books";
import moment from "moment";

export async function ReturnBorrowedController(
  req: Request,
  res: Response
): Promise<any> {

	try {
		
		const { memberCode, bookCode } = req.body;

		const borrowedBook = await BorrowModel.findOne({ memberCode, bookCode });
		if (!borrowedBook) {
		  return res.status(404).json({ response_code:'00', message: 'No record of this book being borrowed by this member' });
		}
	
		// Calculate if it's late (7 days period)
		const returnDate = moment();
		const borrowedDate = moment(borrowedBook.borrowedDate);
	
		// Difference in days
		const dayDiff = returnDate.diff(borrowedDate, 'days');
	
		let penalty = null;
		if (dayDiff > 7) {
		  penalty = new Date();
		  penalty.setDate(penalty.getDate() + 3);
		  await UserModel.updateOne({ code: memberCode }, { penaltyUntil: penalty });
		}
	
		// Delete the borrowed book record
		await BorrowModel.deleteOne({ memberCode, bookCode });
	
		// Increment book stock
		await BookModel.updateOne({ code: bookCode }, { $inc: { stock: 1 } });
	
		res.status(200).json({
			response_code:'00',
			message: `Book returned, ${penalty ? `Member is penalized until ${penalty.toDateString()}!` : 'No penalty applied!'}`,
		});

	} catch (error:any) {

		logger.error(`Error processing borrow request: ${error.message}`);
		res.status(500).json({ response_code:'68', message: 'An error occurred while fetching books' });
		
	}

}
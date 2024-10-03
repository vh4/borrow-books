import { Request, Response } from "express";
import { logger } from "../helpers/logger";
import { UserModel } from "../models/Users";
import { BorrowModel } from "../models/Borrow";
import { BookModel } from "../models/Books";

interface BorrowInterface {
  memberCode: string;
  bookCode: string;
}

interface MemberInterface {
  code: string;
  name: string;
  penaltyUntil: Date | null;
}

export async function BorrowController(
  req: Request,
  res: Response
): Promise<any> {
  try {
  
	const { memberCode, bookCode }: BorrowInterface = req.body;

    // Check if member exists
    const member: MemberInterface | null = await UserModel.findOne({
      code: memberCode,
    });

	// check if member not exist
    if (!member) {
      return res.status(404).json({response_code: "03", message: `Member with code ${memberCode} not found!`});
    }

	// Check if member is penalized.
	if (member.penaltyUntil && member.penaltyUntil > new Date()) {
		return res.status(400).json({ response_code:'03', message: 'Member is penalized!' });
	}

    // Find borrowed books by the member
    const borrowedBooksCount = await BorrowModel.countDocuments({ memberCode });
    if (borrowedBooksCount >= 2) {
      return res.status(400).json({response_code: "03",message: "Member has already borrowed 2 books!"});
    }

    // Find the book
    const book = await BookModel.findOne({ code: bookCode });
    if (!book || book.stock < 1) {
      return res.status(404).json({ response_code: "03", message: "Book not available!"});
    }

    // Borrow the book
    const borrowedBook = new BorrowModel({ memberCode, bookCode });
    await borrowedBook.save();

    // Decrease book stock
    book.stock -= 1;
    await book.save();

    res.status(200).json({response_code:'00',message: `Book ${book.title} has been borrowed by ${member.name}!`});
  
} catch (error: any) {

    logger.error(`Error processing borrow request: ${error.message}`);
	  res.status(500).json({ response_code:'68', message: 'An error occurred while fetching books' });

  }
}

import { Request, Response } from "express";
import { logger } from "../helpers/logger";
import { BorrowModel } from "../models/Borrow";
import { UserModel } from "../models/Users";

export async function CheckMemberController(req: Request, res: Response): Promise<any>{
	try {
	  const members = await UserModel.find();
	  const memberDetails = await Promise.all(members.map(async member => {
		const borrowedCount = await BorrowModel.countDocuments({ memberCode: member.code });
		return {
		  name: member.name,
		  code: member.code,
		  borrowedCount,
		  penaltyUntil: member.penaltyUntil,
		};
	  }));
  
	  res.status(200).json(memberDetails);
	} catch (error:any) {
	  logger.error(`Error processing borrow request: ${error.message}`);
	  res.status(500).json({ error: 'An error occurred while fetching members' });
	}
  };
  
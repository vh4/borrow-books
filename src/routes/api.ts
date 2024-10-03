import { ReturnBorrowedController } from '../controllers/ReturnBorrowedController';
import { CheckMemberController } from '../controllers/CheckMemberController';
import { CheckBookController } from '../controllers/CheckBookController';
import { BorrowController } from '../controllers/BorrowController';
import { Request, Response } from 'express';
import express from 'express';

const Router = express.Router();

Router.get(`/healthy`, async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({response_code: '00',message: 'Success'});
});

/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a member to borrow a book if they meet the borrowing conditions.
 *     tags:
 *       - Borrow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: "M001"
 *                 description: Code of the member borrowing the book.
 *               bookCode:
 *                 type: string
 *                 example: "JK-45"
 *                 description: Code of the book being borrowed.
 *     responses:
 *       200:
 *         description: Successful borrowing of the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response_code:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "Book Harry Potter has been borrowed by Angga!"
 *       400:
 *         description: Validation errors such as member penalties or borrowing limits.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response_code:
 *                   type: string
 *                   example: "03"
 *                 message:
 *                   type: string
 *                   example: "Member is penalized!"
 *       404:
 *         description: Member or book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response_code:
 *                   type: string
 *                   example: "03"
 *                 message:
 *                   type: string
 *                   example: "Member with code M001 not found!"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response_code:
 *                   type: string
 *                   example: "68"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while fetching books"
 */


Router.post('/borrow', BorrowController);


/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members and their borrowing details
 *     description: Retrieves all members and the number of books they have borrowed, along with penalty information.
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: A list of all members with their borrowing details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Angga"
 *                     description: The name of the member
 *                   code:
 *                     type: string
 *                     example: "M001"
 *                     description: The code of the member
 *                   borrowedCount:
 *                     type: integer
 *                     example: 2
 *                     description: The number of books the member has borrowed
 *                   penaltyUntil:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     example: "2024-10-01T00:00:00Z"
 *                     description: Date until the member is penalized (null if not penalized)
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while fetching members"
 */

Router.post('/return', ReturnBorrowedController);
Router.get('/books', CheckBookController);
Router.get('/members', CheckMemberController);

export default Router;
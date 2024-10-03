import { ReturnBorrowedController } from '../controllers/ReturnBorrowedController';
import { CheckMemberController } from '../controllers/CheckMemberController';
import { CheckBookController } from '../controllers/CheckBookController';
import { BorrowController } from '../controllers/BorrowController';
import { Request, Response } from 'express';
import express from 'express';

const Router = express.Router();

/**
 * @swagger
 * /api/healthy:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the status of the API to verify that the service is running.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy and running.
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
 *                   example: "Success"
 *       500:
 *         description: Server error.
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
 *                   example: "An error occurred"
 */

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
 * /api/books:
 *   get:
 *     summary: Retrieve a list of available books
 *     description: Retrieves all books that have stock greater than zero.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books with available stock.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response_code:
 *                   type: string
 *                   example: '00'
 *                 message:
 *                   type: string
 *                   example: 'Success'
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: 'JK-45'
 *                       title:
 *                         type: string
 *                         example: 'Harry Potter'
 *                       author:
 *                         type: string
 *                         example: 'J.K Rowling'
 *                       stock:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response_code:
 *                   type: string
 *                   example: '68'
 *                 message:
 *                   type: string
 *                   example: 'An error occurred while fetching books'
 */


Router.get('/books', CheckBookController);

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
Router.get('/members', CheckMemberController);

/**
 * @swagger
 * /api/return:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows a member to return a borrowed book and applies penalties if the return is late.
 *     tags: [Return]
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
 *                 description: Code of the member returning the book.
 *               bookCode:
 *                 type: string
 *                 example: "JK-45"
 *                 description: Code of the book being returned.
 *     responses:
 *       200:
 *         description: Successful return of the book.
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
 *                   example: "Book returned, Member is penalized until Thu Oct 05 2023!"
 *       400:
 *         description: Validation errors such as missing or incorrect data.
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
 *                   example: "No record of this book being borrowed by this member"
 *       404:
 *         description: Book or member not found.
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
 *                   example: "No record of this book being borrowed by this member"
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
Router.post('/return', ReturnBorrowedController);

export default Router;
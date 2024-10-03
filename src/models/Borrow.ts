import mongoose, { Document } from 'mongoose';

interface IBorrowedBook extends Document {
	memberCode: string;
	bookCode: string;
	borrowedDate: Date;
}

const BorrrowSchema = new mongoose.Schema<IBorrowedBook>({
	memberCode: { type: String, required: true },
	bookCode: { type: String, required: true },
	borrowedDate: { type: Date, default: Date.now }
});

export const BorrowModel = mongoose.model<IBorrowedBook>('BorrowedBook', BorrrowSchema);
import mongoose, { Document, Model } from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../helpers/logger';

// Define an interface for the User document.
interface IUser extends Document {
  name: string;
  code: string;
}

// Define User schema with typing.
const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

// Create a model from the schema with the correct typing.
const UserModel: Model<IUser> = mongoose.model<IUser>('members', UserSchema);

const insertUsersIfNotExists = async (): Promise<void> => {
  try {

    const filePath = path.resolve(__dirname, '../data/members.json');


    const fileData = await fs.readFile(filePath, 'utf-8');
    const members: Array<{ name: string; code: string }> = JSON.parse(fileData);


    for (const member of members) {
      const { code, name } = member;

      const existingUser = await UserModel.findOne({ code });

      if (!existingUser) {

        const newUser = new UserModel({ name, code });
        await newUser.save();
        logger.info(`User ${name} with code ${code} has been added.`);

      } else {

        logger.warn(`User with code ${code} already exists.`);

      }
    }
  } catch (error) {

    logger.error('Error occurred while inserting users:', error);

  }
};

export { insertUsersIfNotExists, UserModel };

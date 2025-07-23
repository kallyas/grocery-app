import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DEVELOPMENT, PRODUCTION, LOCAL, Environment } from './envTypes.js';

dotenv.config();

let DB_URL: string | undefined;

const nodeEnv = process.env.NODE_ENV as Environment;

switch (nodeEnv) {
  case DEVELOPMENT:
    DB_URL = process.env.DB_URL_DEV;
    break;
  case PRODUCTION:
    DB_URL = process.env.DB_URL_PROD;
    break;
  case LOCAL:
    DB_URL = process.env.DB_URL_LOC;
    break;
  default:
    DB_URL = process.env.DB_URL;
}

if (!DB_URL) {
  throw new Error('Database URL is not defined in environment variables');
}

function establishConnection(): void {
  if (!DB_URL) {
    throw new Error('Database URL is not defined');
  }

  console.log('\nEstablishing Database Connection . . . ');
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.info('\nDatabase Connection Established!');
    })
    .catch((err: Error) => {
      console.log('\nDatabase Connection Failed!');
      console.error('Error Details: ', err);
      console.log('\n\nDatabase Connection Failed, Retrying . . .');
      establishConnection();
    });
}

establishConnection();
const db = mongoose.connection;

export default db;
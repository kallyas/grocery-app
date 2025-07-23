import dotenv from 'dotenv';
import './server/config/connect.js';
import app from './server/app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Using environment: ${process.env.NODE_ENV}`);
  console.log(`Server successfully started and listening on port ${PORT}`);
});
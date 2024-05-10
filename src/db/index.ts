import dotenv from 'dotenv';

dotenv.config();

const pgp = require('pg-promise')({});

// Database connection details;
const cn = {
  host: process.env.HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const db = pgp(cn);

// Test connection
db.connect()
  .then((obj) => {
    console.log('Connected to database');
    obj.done();
  })
  .catch((error: any) => {
    console.error('ERROR:', error.message);
  });

export const query = (query: string) => {
  db.query(query).then((result: any) => {
    console.log('DATA:', result);
    return result;
  })
    .catch((error: any) => {
      console.log('ERROR:', error);
    });
};

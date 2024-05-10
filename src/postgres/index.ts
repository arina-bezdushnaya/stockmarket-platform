// import moment from 'moment';
// import dotenv from 'dotenv';
//
// dotenv.config();
//
// const pgp = require('pg-promise')({});
//
// // Database connection details;
// const cn = {
//   host: process.env.HOST,
//   port: process.env.POSTGRES_PORT,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DB,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };
//
// const db = pgp(cn);
//
// // Test connection
// db.connect()
//   .then((obj) => {
//     console.log('Connected to database');
//     obj.done();
//   })
//   .catch((error: any) => {
//     console.error('ERROR:', error.message);
//   });
//
// export const query = (query: string) => {
//   db.query(query).then((result: any) => {
//     console.log('DATA:', result);
//     return result;
//   })
//     .catch((error: any) => {
//       console.log('ERROR:', error);
//     });
// };
//
// console.log(moment());
//
// export const getCompanyPrice = () => {
//   const company = 'IBM';
//   const currentDate = moment().subtract(1, 'w')
//     .hours(0)
//     .minutes(0)
//     .seconds(0)
//     .format('YYYY-MM-DD HH:mm:ss');
//
//   console.log(currentDate);
//
//
//   return query(`SELECT * from stockprices WHERE company='${company}'  AND timestamp <= NOW()::timestamp AND timestamp > '${currentDate}'`);
// };
//
// getCompanyPrice();
//
// module.exports = {
//   getCompanyPrice: getCompanyPrice,
//   // getSinglePuppy: getSinglePuppy,
//   // createPuppy: createPuppy,
//   // updatePuppy: updatePuppy,
//   // removePuppy: removePuppy
// };

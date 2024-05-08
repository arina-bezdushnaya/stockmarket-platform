var pgp = require('pg-promise')(/*options*/);

// Database connection details;
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'xxx',
  user: 'xxx',
  password: 'xxx',
};
var db = pgp(cn);

// Простой запрос к базе данных для проверки
// db.query('SELECT NOW()', (err: any, result: any) => {
//     if (err) {
//         console.error('Ошибка выполнения запроса:', err);
//     } else {
//         console.log('Результат запроса:', result.rows[0]);
//     }
// });

db.any('select * from users where active = $1', [true])
  .then((data: any) => {
    console.log('DATA:', data);
  })
  .catch((error: any) => {
    console.log('ERROR:', error);
  });

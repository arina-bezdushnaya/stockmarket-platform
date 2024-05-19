import {Response, Request} from 'express';
import {Company, StockPrice} from '../../types';
import {db} from '../../db';


export function getCompanyPrice(req: Request, res: Response) {
  const {company, from, to, interval} = req.query;

  const isHourly = interval === '1d' ||
    interval === '1w' ||
    interval === '2w';
  const isYearly = interval === '1y' ||
    interval === '6M';

  db.query(`
SELECT * from stockprices 
WHERE company='${company}' 
AND timestamp <= '${to}' 
AND timestamp >= '${from}'
${!isHourly ? 'AND timestamp::time between \'00:00:00\' AND \'04:00:00\'' : ''}
${isYearly ? 'AND (date_part(\'day\', timestamp) = 1 ' +
 'OR date_part(\'day\', timestamp) = 15 OR date_part(\'day\', timestamp) = 22 ' +
 'OR date_part(\'day\', timestamp) = 27)' : ''}
`)
    .then((result: StockPrice[]) => {
      // console.log('DATA:', result);
      res.send(result);
    })
    .catch((error: any) => {
      console.log('ERROR:', error);
    });
}

export function getCompanies(req: Request, res: Response) {
  db.query(`SELECT DISTINCT company FROM stockprices`)
    .then((result: Company[]) => {
      const companies = result.map(comp => comp.company);

      res.send(companies);
    })
    .catch((error: any) => {
      console.log('ERROR:', error);
    });
}

export function getSummary(req: Request, res: Response) {
  const {company} = req.params;

  db.query(`SELECT * FROM summary WHERE company='${company}'`)
    .then((result) => {
      res.send(result[0]);
    })
    .catch((error: any) => {
      console.log('ERROR:', error);
    });
}

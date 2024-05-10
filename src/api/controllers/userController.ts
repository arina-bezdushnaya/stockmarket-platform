import {Response, Request} from 'express';
import {StockPrice} from '../../types';
import {db} from '../../db';


export function getCompanyPrice(req: Request, res: Response) {
  const company = String(req.query.company);
  const from = String(req.query.from);
  const to = String(req.query.to);

  db.query(`SELECT * from stockprices WHERE company='${company}' AND timestamp <= '${to}' AND timestamp >= '${from}'`)
    .then((result: StockPrice[]) => {
      console.log('DATA:', result);
      res.send(result);
    })
    .catch((error: any) => {
      console.log('ERROR:', error);
    });
}

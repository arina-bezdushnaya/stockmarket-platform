import {Response, Request} from 'express';
import stockPrices from '../../database/stockPrice.json';
import {StockPrice, TimeInterval} from '../../types';

const prices: Record<string, StockPrice[]> = stockPrices;


export function getCompanyPrice(req: Request, res: Response) {
  const company = String(req.query.company);
  const time = String(req.query.time);

  const companyPrice: StockPrice[] = prices[company].filter(timePrice => {
    const minutes = new Date(timePrice.date).getMinutes();

    switch (time) {
      case TimeInterval['15min']:
        return timePrice;
      case TimeInterval['30min']:
        if (minutes === 0 || minutes === 30) {
          return timePrice;
        }
        return;
      case TimeInterval['60min']:
        if (minutes === 0) {
          return timePrice;
        }
        return;
    }
  });

  res.send(companyPrice);
}

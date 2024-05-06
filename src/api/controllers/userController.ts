import {Response, Request} from 'express';
import moment from 'moment';
import stockPricesDay from '../../database/stockPriceDay.json';
import stockPricesYear from '../../database/stockPriceYear.json';
import {StockPrice, TimeInterval} from '../../types';

const prices: Record<string, StockPrice[]> = stockPricesDay;
const pricesYear: Record<string, StockPrice[]> = stockPricesYear;

export function getCompanyPrice(req: Request, res: Response) {
  const company = String(req.query.company);
  const time = String(req.query.time);

  // const companyPrice: StockPrice[] = pricesYear[company];

  const currentDate = new Date();
  const startDate = moment(currentDate).subtract(6, 'M').date(1).hours(0).minutes(0).seconds(0);
  // console.log(startDate);

  const companyPrice: StockPrice[] = pricesYear[company].filter(timePrice => {
    const date = moment(timePrice.date);
    const day = date.date();

    switch (time) {
      case TimeInterval['1D']:
        return timePrice;
      case TimeInterval['1W']:
        // if (minutes === 0 || minutes === 30) {
        // return timePrice;
        // }
        return;
      case TimeInterval['6M']:
        if (date.diff(startDate, 'days') >= 0) {
          return timePrice;
        }
        return;
      case TimeInterval['1Y']:
        if (day === 1) {
          return timePrice;
        }
    }
  });

  res.send(companyPrice);
}

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
  const currentDate = moment();

  const startSixMonthsDate = moment(currentDate)
    .subtract(6, 'M')
    .date(1)
    .hours(0)
    .minutes(0)
    .seconds(0);
  const currentDayDiff = currentDate.diff(startSixMonthsDate, 'days');

  const startThreeMonthsDate = moment(currentDate)
    .subtract(3, 'M')
    .date(1)
    .hours(0)
    .minutes(0)
    .seconds(0);
  const startMonthDate = moment(currentDate)
    .subtract(1, 'M')
    .date(1)
    .hours(0)
    .minutes(0)
    .seconds(0);
  const startTwoWeeksDate = moment(currentDate)
    .subtract(2, 'w')
    // .date(1)
    .hours(0)
    .minutes(0)
    .seconds(0);
  const startWeekDate = moment(currentDate).subtract(1, 'M').date(1).hours(0).minutes(0).seconds(0);

  console.log(startTwoWeeksDate);

  const timeSteps = pricesYear[company].length - 1;

  const companyPrice: StockPrice[] = pricesYear[company].filter((timePrice, index) => {
    const date = moment(timePrice.date);
    const day = date.date();
    const sixMonthRange = date.diff(startSixMonthsDate, 'days');

    // console.log(date, sixMonthRange, currentDayDiff);

    switch (time) {
      case TimeInterval['1D']:
        if (index >= timeSteps - 17) {
          return timePrice;
        }
        return;
      case TimeInterval['1W']:
        // if (minutes === 0 || minutes === 30) {
        // return timePrice;
        // }
        return;
      case TimeInterval['6M']:
        if (sixMonthRange >= 0 && sixMonthRange <= currentDayDiff) {
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

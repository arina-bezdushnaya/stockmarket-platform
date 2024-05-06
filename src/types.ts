// export enum TimeInterval {
//   'year' = '1Y',
//   '6months' = '6M',
//   '3months' = '3M',
//   'month' = '1M',
//   '2week' = '2W',
//   'week' = '1W',
//   'day' = '1D',
// }
export enum TimeInterval {
  '1Y' = 'year',
  '6M' = '6months',
  '3M' = '3months',
  '1M' = 'month',
  '2W' = '2week',
  '1W' = 'week',
  '1D' = 'day',
}

export interface StockPrice {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

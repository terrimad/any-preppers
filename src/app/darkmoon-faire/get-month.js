import moment from 'moment-timezone';

import db from '../db.json';

export default (timezone) => {
  const {
    'darkmoon-faire': dmf,
  } = db;

  const dmfMonth = (key) => {
    return Object
      .keys(dmf)
      .reduce(
        (acc, curr) => {
          if (acc) {
            return acc;
          }
          if (curr === key) {
            return dmf[key];
          }
          return false;
        },
        false,
      );
  };

  const tzDate = (date = moment.now()) => moment(date).tz(timezone);

  const currMonthKey = tzDate().format('MMM').toLowerCase();
  const nextMonthKey = tzDate().add('1', 'month').format('MMM').toLowerCase();

  const current = dmfMonth(currMonthKey);
  const next = dmfMonth(nextMonthKey);

  return { current, next };
};
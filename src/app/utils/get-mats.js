import db from '../db.json';

const getMats = (key, multiplier = 1, mats = {}) => {
  const item = db[key];

  if (item) {
    if (item.mats) {
      Object
        .keys(item.mats)
        .forEach((key) => {
          const amount = item.mats[key];
          if (db[key]) {
            getMats(key, amount, mats);
          } else {
            mats[key] = (mats[key] || 0) + (amount * multiplier);
          }
        });
    } else {
      mats[key] = (mats[key] || 0) + multiplier;
    }
  }

  return mats;
};

export default getMats;
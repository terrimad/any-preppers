import items from '../items.json';

const getMats = (key, multiplier = 1, mats = {}) => {
  const item = items[key];

  if (item) {
    Object
      .keys(item)
      .forEach((key) => {
        const amount = item[key];
        if (items[key]) {
          getMats(key, amount, mats);
        } else if (mats[key]) {
          mats[key] = mats[key] + (amount * multiplier);
        } else {
          mats[key] = (amount * multiplier);
        }
      });
  }

  return mats;
};

export default getMats;
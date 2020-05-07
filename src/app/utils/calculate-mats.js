


export default (items, db) => {
  const mats = {};

  const getMats = (key, multiplier = 1, mats = {}) => {
    const item = db[key];

    if (item) {
      Object
        .keys(item)
        .forEach((key) => {
          const amount = item[key];
          if (db[key]) {
            getMats(key, amount, mats);
          } else {
            mats[key] = (mats[key] || 0) + (amount * multiplier);
          }
        });
    }

    return mats;
  };

  Object
    .keys(items)
    .forEach((key) => {
      const amount = items[key];
      if (amount > 0) {
        const subMats = getMats(key);

        if (amount > 1) {
          Object
            .keys(subMats)
            .forEach((key) => {
              subMats[key] = subMats[key] * amount;
            });
        }

        mats[key] = subMats;
      }
    });

  return mats;
};
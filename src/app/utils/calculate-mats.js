import getMats from './get-mats';

export default (items) => {
  const mats = {};
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
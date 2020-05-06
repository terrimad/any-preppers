import { useCallback, useEffect, useState } from 'react';

import { crafting } from '../db.json';
import { calculateMats } from '../utils';

export default (type = '') => {
  const [mats, setMats] = useState({});
  const [items, setItems] = useState({});

  useEffect(
    () => {
      if (type) {
        const mats = Object
          .keys(crafting)
          .reduce(
            (acc, curr) => {
              const item = crafting[curr];
              if (item && item.craftable && item.profession === type) {
                acc[curr] = 0;
              }
              return acc;
            },
            {},
          );

        setItems(mats);
      }
    },
    [type],
  );


  const handleMats = useCallback(
    (event, key) => {
      const newItems = Object.assign({}, items);
      if (event.nativeEvent.wheelDelta || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        if (event.nativeEvent.wheelDelta > 0 || event.key === 'ArrowUp') {
          newItems[key]++;
        } else if (newItems[key] > 0) {
          newItems[key]--;
        }
      }
      setItems(newItems);

      const mats = {};
      const calculatedMats = calculateMats(newItems);

      Object
        .keys(calculatedMats)
        .forEach((key) => {
          const newMats = calculatedMats[key];
          Object
            .keys(newMats)
            .forEach((key) => {
              if (mats[key]) {
                mats[key] = mats[key] + newMats[key];
              } else {
                mats[key] = newMats[key];
              }
            });
        });

      setMats(mats);
    },
    [mats, items, setMats, setItems],
  );

  return [mats, items, handleMats];
};
import { useCallback, useContext, useEffect, useState } from 'react';

import db from '../db.json';
import calculateMats from './calculate-mats';
import MaterialDbContext from './material-db-context';

export default (type = '') => {
  const materialDb = useContext(MaterialDbContext)
  const [mats, setMats] = useState({});
  const [items, setItems] = useState({});

  useEffect(
    () => {
      if (type) {
        const profession = db?.crafting[type];
        if (profession) {
          const items = profession.reduce(
            (acc, curr) => {
              acc[curr] = 0;
              return acc;
            },
            {},
          );

          setItems(items);
        }
      }
    },
    [type, setItems],
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
      const calculatedMats = calculateMats(newItems, materialDb);

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
    [mats, items, setMats, setItems, materialDb],
  );

  return [mats, items, handleMats];
};
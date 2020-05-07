import { useCallback, useEffect, useMemo, useState } from 'react';

import db from '../db.json';
import { useMaterialDb, useStorageProvider } from './use-contexts';

export default (type = '') => {
  const { session } = useStorageProvider();
  const materialDb = useMaterialDb();
  const storageMatsKey = `${ type }-crafting-mats`;
  const storageItemsKey = `${ type }-crafting-items`;

  const storedMats = useMemo(() => session.get(storageMatsKey) || {}, []);
  const storedItems = useMemo(() => session.get(storageItemsKey) || {}, []);

  const [mats, setMats] = useState(storedMats);
  const [items, setItems] = useState(storedItems);

  useEffect(
    () => {
      if (type && !Object.keys(items).length) {
        const profession = db?.crafting[type];
        if (profession) {
          const items = profession.reduce(
            (acc, curr) => {
              acc[curr] = 0;
              return acc;
            },
            {},
          );

          session.set(storageItemsKey, items);
          setItems(items);
        }
      }
    },
    [type, items, setItems],
  );

  const calculateMats = useCallback(
    (items) => {
      const mats = {};

      const getMats = (key, multiplier = 1, mats = {}) => {
        const item = materialDb[key];

        if (item) {
          Object
            .keys(item)
            .forEach((key) => {
              const amount = item[key];
              if (materialDb[key]) {
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
    },
    [materialDb],
  );

  const updateMats = useCallback(
    (items = {}) => {
      const mats = {};
      const calculatedMats = calculateMats(items);

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

      session.set(storageMatsKey, mats);
      setMats(mats);
    },
    [setMats, calculateMats],
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

      session.set(storageItemsKey, newItems);
      setItems(newItems);
      updateMats(newItems);
    },
    [items, updateMats, setItems],
  );

  return [mats, items, handleMats];
};
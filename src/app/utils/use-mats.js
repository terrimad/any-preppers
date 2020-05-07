import { useCallback, useEffect, useMemo, useState } from 'react';

import db from '../db.json';
import calculateMats from './calculate-mats';
import { useMaterialDb, useStorageProvider } from './use-contexts';

export default (type = '') => {
  const { session } = useStorageProvider();
  const materialDb = useMaterialDb();
  const storageMatsKey = `any-preppers-${ type }-crafting-mats`;
  const storageItemsKey = `any-preppers-${ type }-crafting-items`;

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

  const updateMats = useCallback(
    (items = {}) => {
      const mats = {};
      const calculatedMats = calculateMats(items, materialDb);

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
    [setMats, materialDb],
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
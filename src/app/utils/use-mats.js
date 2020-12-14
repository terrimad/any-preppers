import { useCallback, useEffect, useMemo, useState } from 'react';

import db from '../db.json';
import generateHash from './generate-hash';
import { useEntityDb, useStorageProvider } from './use-contexts';

export default (type = '') => {
  const { session, local } = useStorageProvider();
  const entityDb = useEntityDb();
  const storageMatsKey = `${ type }-crafting-mats`;
  const storageItemsKey = `${ type }-crafting-items`;
  const storageCacheHashKey = `${ type }-cache-hash`;

  const storedMats = useMemo(() => session.get(storageMatsKey) || {}, []);
  const storedItems = useMemo(() => session.get(storageItemsKey) || {}, []);

  const [mats, setMats] = useState(storedMats);
  const [items, setItems] = useState(storedItems);

  useEffect(
    () => {
      const profession = db?.crafting[type];
      if (profession) {
        const hash = generateHash(JSON.stringify(profession));
        const stored = local.get(storageCacheHashKey);

        if (type && (!Object.keys(items).length || stored !== hash)) {
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
        const item = entityDb[key];

        if (item && item.reagents) {
          Object
            .keys(item.reagents)
            .forEach((key) => {
              const amount = item.reagents[key];
              const subItem = entityDb[key];
              if (subItem && subItem.reagents && Object.keys(subItem.reagents).length) {
                getMats(key, amount / item.divider, mats);
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
    [entityDb],
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
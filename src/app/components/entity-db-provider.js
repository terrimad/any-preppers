import React, { useEffect, useState } from 'react';

import db from '../db.json';
import { EntityDbContext, buildEntityDb, generateHash, useStorageProvider } from '../utils';
import Loader from './loader';

export default ({ profession, children }) => {
  const { local } = useStorageProvider();

  const storageDbKey = `${ profession }-entity-db`;
  const storageCacheHashKey = `${ profession }-cache-hash`;
  const storedMaterialDb = local.get(storageDbKey) || {}

  const [materialDb, setMaterialDb] = useState(storedMaterialDb);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const craftables = db?.crafting[profession] || [];

      const hash = generateHash(JSON.stringify(craftables));
      const stored = local.get(storageCacheHashKey);

      if (craftables.length && (!Object.keys(materialDb).length || stored !== hash)) {
        setLoading(true);
        buildEntityDb(craftables).then((materialDb) => {
          setLoading(false);
          local.set(storageDbKey, materialDb);
          local.set(storageCacheHashKey, hash);
          setMaterialDb(materialDb);
        });
      }
    },
    [materialDb, local],
  );

  if (loading) {
    return <Loader />;
  }

  return <EntityDbContext.Provider value={materialDb}>
    {children}
  </EntityDbContext.Provider>;
}

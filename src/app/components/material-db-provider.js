import React, { useEffect, useState } from 'react';

import db from '../db.json';
import { MaterialDbContext, buildMaterialDb, useStorageProvider } from '../utils';
import Loader from './loader';

export default ({ profession, children }) => {
  const { session } = useStorageProvider();
  const storageDbKey = `${ profession }-material-db`;
  const storedMaterialDb = session.get(storageDbKey) || {}

  const [materialDb, setMaterialDb] = useState(storedMaterialDb);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const craftables = db?.crafting[profession] || [];

      if (craftables && !Object.keys(materialDb).length) {
        setLoading(true);
        buildMaterialDb(craftables).then((materialDb) => {
          setLoading(false);
          session.set(storageDbKey, materialDb);
          setMaterialDb(materialDb);
        });
      }
    },
    [materialDb],
  );

  if (loading) {
    return <Loader />;
  }

  return <MaterialDbContext.Provider value={materialDb}>
    {children}
  </MaterialDbContext.Provider>;
}

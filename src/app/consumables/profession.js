import React, { useEffect, useState } from 'react';

import { CraftTable, Loader, Title } from '../components'
import db from '../db.json';
import { MaterialDbContext, buildMaterialDb } from '../utils';

export default ({ profession, label }) => {
  const [materialDb, setMaterialDb] = useState({});
  const [loading, setLoading] = useState(false);
  const craftables = db?.crafting[profession] || [];

  useEffect(
    () => {
      if (craftables) {
        setLoading(true);
        buildMaterialDb(craftables).then((materialDb) => {
          setLoading(false);
          setMaterialDb(materialDb);
        });
      }
    },
    [craftables],
  );

  if (loading) {
    return <Loader />;
  }

  if (!Object.keys(materialDb).length) {
    return null;
  }

  return <MaterialDbContext.Provider value={materialDb}>
    <>
      <Title label={label} />
      <CraftTable profession={profession} />
    </>
  </MaterialDbContext.Provider>;
}
import React from 'react';

import { Craftables, Mats, Title } from '../components'
import { useMats, useRefreshLinks } from '../utils';

export default ({ profession, label }) => {
  useRefreshLinks();
  const [mats, items, handleMats] = useMats(profession);

  if (!profession) {
    return null;
  }

  return <>
    <Title label={label} />
    <Craftables items={items} update={handleMats} />
    <Mats mats={mats} />
  </>;
}
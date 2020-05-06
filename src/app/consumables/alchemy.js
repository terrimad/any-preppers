import React from 'react';

import { Craftables, Mats, Title } from '../components';
import { useMats, useRefreshLinks } from '../utils';

export default () => {
  useRefreshLinks();
  const [mats, items, handleMats] = useMats('alchemy');

  return <>
    <Title label="Alchemy" />
    <Craftables items={items} update={handleMats} />
    <Mats mats={mats} />
  </>;
}
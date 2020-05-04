import React from 'react';

import { Craftables, Mats } from '../components';
import { useMats, useRefreshLinks } from '../utils';

export default () => {
  useRefreshLinks();
  const [mats, items, handleMats] = useMats('alchemy');
  
  return <>
    <Craftables items={items} onScroll={handleMats} />
    <Mats mats={mats} />
  </>;
}
import React from 'react';

import { Craftables, Mats, Title } from '../components'
import { useMats, useRefreshLinks } from '../utils';

export default () => {
  useRefreshLinks();
  const [mats, items, handleMats] = useMats('engineering');

  return <>
    <Title label="Engineering" />
    <Craftables items={items} update={handleMats} />
    <Mats mats={mats} />
  </>;
}
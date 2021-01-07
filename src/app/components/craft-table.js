import React from 'react';

import { useMats, useRefreshLinks } from '../utils';
import Craftables, { Mats } from './craftables';
import Helper from './helper';

export default ({ profession }) => {
  useRefreshLinks();
  const [mats, items, handleMats] = useMats(profession);

  if (!Object.keys(items).length) {
    return null;
  }

  return <>
    <Helper />
    <Craftables items={items} update={handleMats} />
    <Mats mats={mats} />
  </>
}
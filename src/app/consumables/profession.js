import React from 'react';

import { CraftTable, MaterialDbProvider, Title } from '../components'
import { useRefreshLinks } from '../utils';

export default ({ profession, label }) => {
  useRefreshLinks();

  return <MaterialDbProvider profession={profession}>
    <Title label={label} />
    <CraftTable profession={profession} />
  </MaterialDbProvider>;
}
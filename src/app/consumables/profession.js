import styled from '@emotion/styled';
import React from 'react';

import { CraftTable, EntityDbProvider, Title } from '../components'
import { useRefreshLinks } from '../utils';

export default ({ profession, label }) => {
  useRefreshLinks();

  return <EntityDbProvider profession={profession}>
    <Wrapper>
      <Title label={label} />
      <CraftTable profession={profession} />
    </Wrapper>
  </EntityDbProvider>;
}

const Wrapper = styled.div`
  position: relative;
  flex: 1;
`;
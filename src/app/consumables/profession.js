import styled from '@emotion/styled';
import React from 'react';

import { CraftTable, MaterialDbProvider, Title } from '../components'
import { useRefreshLinks } from '../utils';

export default ({ profession, label }) => {
  useRefreshLinks();

  return <MaterialDbProvider profession={profession}>
    <Wrapper>
      <Title label={label} />
      <CraftTable profession={profession} />
    </Wrapper>
  </MaterialDbProvider>;
}

const Wrapper = styled.div`
  position: relative;
  flex: 1;
`;
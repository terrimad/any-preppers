import styled from '@emotion/styled';
import React from 'react';

import CraftingLink from './crafting-link';

export default () => {
  return <Wrapper>
    <List>
      <ListItem>
        <CraftingLink />
      </ListItem>
    </List>
  </Wrapper>
};

const Wrapper = styled.div`
  padding: 0 20%;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
`;

const ListItem = styled.li`
`;
import styled from '@emotion/styled';
import moment from 'moment';
import React from 'react';

import { Link as CraftingLink } from '../crafting';
import { Box as DarkmoonFaireBox } from '../darkmoon-faire';

export default () => {
  return <Wrapper>
    <List>
      <ListItem>
        <CraftingLink />
      </ListItem>
      <ListItem>
        <DarkmoonFaireBox />
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
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin: 0 0 20px;
  }
`;
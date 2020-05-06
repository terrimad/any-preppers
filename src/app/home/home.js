import styled from '@emotion/styled';
import React from 'react';

import { Link as ConsumablesLink } from '../consumables';
import { Box as DarkmoonFaireBox } from '../darkmoon-faire';

export default () => {
  return <Wrapper>
    <List>
      <ListItem>
        <ConsumablesLink />
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
`;

const ListItem = styled.li`
  margin: 0 10px;
`;
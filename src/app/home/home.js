import styled from '@emotion/styled';
import React from 'react';

import { Link as ConsumablesLink } from '../consumables';
import { Box as DarkmoonFaireBox } from '../darkmoon-faire';

export default () => {
  return <List>
    <ListItem>
      <ConsumablesLink />
    </ListItem>
    <ListItem>
      <DarkmoonFaireBox />
    </ListItem>
  </List>;
};

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ListItem = styled.li`
  margin: 0 10px 10px;
  width: 100%;
  @media only screen and (min-width: 700px) {
    max-width: 600px;
  }
`;
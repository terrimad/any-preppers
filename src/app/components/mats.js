import styled from '@emotion/styled';
import React from 'react';

import Entity, { Amount } from './entity';

const List = styled.ul`
  padding: 30px 20%;
  list-style: none;
  overflow-y: overlay;
  flex: 1;
  border-top: 1px solid ${p => p.theme.textColor};
  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.textColor};
  }
`;

const ListItem = styled.li`
  display: flex;
  &:not(:last-child) {
    margin: 0 0 30px 0;
  }
  >:first-of-type {
    margin: 0 15px 0 0;
  }
`;

export default ({ mats = {} }) => {
  if (Object.keys(mats).length === 0) {
    return null;
  }

  return <List>
    {Object
      .keys(mats)
      .sort()
      .map(key => {
        return <ListItem key={key}>
          <Entity id={key} />
          <Amount>{mats[key]}x</Amount>
        </ListItem>;
      })}
  </List>;
};
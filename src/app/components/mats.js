import React from 'react';
import styled from '@emotion/styled';
import Entity, { Amount } from './entity';
import db from '../db.json';

const List = styled.ul`
  padding: 0 20%;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 20px 0;
  display: flex;
  >:first-of-type {
    margin: 0 10px 0 0;
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
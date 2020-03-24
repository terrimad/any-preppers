import React from 'react';
import styled from '@emotion/styled';
import Symbol, { Amount } from './symbols';

const List = styled.ul`
  padding: 0 20%;
  list-style: none;
`;

const Item = styled.li`
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
        return <Item key={key}>
          <Symbol image={key} />
          <Amount>{mats[key]}x</Amount>
        </Item>;
      })}
  </List>;
};
import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'wouter';

import { Entity } from '../components';

export default () => {
  return <Wrapper>
    <Header>crafting</Header>
    <List>
      <ListItem>
        <Link href="/engineering">
          <Entity id="engineering" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/alchemy">
          <Entity id="alchemy" />
        </Link>
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

const Header = styled.h2`
  font-size: 35px;
  margin: 20px 0;
  display: block;
  text-align: center;
  letter-spacing: 2px;
`;
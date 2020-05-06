import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'wouter';

import { Entity, Title } from '../components';

export default () => {

  return <Wrapper>
    <Title label="Professions" />
    <List>
      <ListItem>
        <Link href="/consumables/engineering">
          <Entity id="engineering" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/alchemy">
          <Entity id="alchemy" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/blacksmithing">
          <Entity id="blacksmithing" />
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
  margin: 15px 0 0;
`;

const ListItem = styled.li`
  margin: 0 10px;
`;
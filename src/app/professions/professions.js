import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'wouter';
import { Entity, Button } from '../components';



export default () => {
  return <Wrapper>
    <Header>Choose a profession</Header>
    <List>
      <ListItem>
        <Link href="/engineering">
          <Button>
            <Entity id="engineering" />
          </Button>
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
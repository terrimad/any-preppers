import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'wouter';
import { Symbol, Button } from '../components';



export default () => {
  return <Wrapper>
    <Header>Choose a profession</Header>
    <List>
      <Item>
        <Link href="/engineering">
          <Button>
            <Symbol image="engineering" />
          </Button>
        </Link>
      </Item>
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

const Item = styled.li`
  margin: 0 10px;
`;

const Header = styled.h2`
  font-size: 35px;
  margin: 20px 0;
  display: block;
  text-align: center;
  letter-spacing: 2px;
`;
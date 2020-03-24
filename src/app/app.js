import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming'
import { Engineering } from './professions';
import { Link, Switch, Route } from 'wouter';
import Router from './router';

const theme = {
  colors: {
    text: '#A7A7A7',
    border: '#A7A7A7',
  },
};

export default function App () {
  return <Router>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Link href="/">
          <Header>Crafty</Header>
        </Link>
        <Switch>
          <Route path="/">
            <SubHeader>Choose a profession</SubHeader>
          </Route>
          <Route path="/engineering" component={Engineering} />
        </Switch>
      </Wrapper>
    </ThemeProvider>
  </Router>;
};

const Wrapper = styled.div`
  * {
      color: ${p => p.theme.colors.text };
    font-family: 'Open Sans';
  }
`;

const SubHeader = styled.h2`
  font-size: 40px;
  font-weight: 300;
  padding: 20px 0;
  display: block;
  text-align: center;
  letter-spacing: 2px;
`;

const Header = styled.h1`
  font-size: 50px;
  font-weight: 300;
  padding: 20px 0;
  display: block;
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer;
`;
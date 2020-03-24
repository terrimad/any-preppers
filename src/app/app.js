import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming'
import { Engineering, Professions } from './professions';
import { Link, Switch, Route, useLocation } from 'wouter';
import { Caret, Button as ButtonBase } from './components';
import Router from './router';

const theme = {
  colors: {
    text: '#A7A7A7',
    border: '#A7A7A7',
  },
  iconSize: '60px',
  borderSize: '1px',
  borderRadius: '1px',
};

export default function App () {
  return <Router>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header>Crafty</Header>
        <Back />
        <Switch>
          <Route path="/" component={Professions} />
          <Route path="/engineering" component={Engineering} />
        </Switch>
      </Wrapper>
    </ThemeProvider>
  </Router>;
};

const Back = () => {
  const [location] = useLocation();
  if (location === '/') {
    return null;
  }
  return <Link href="/">
    <Button title="Home">
      <Caret />
    </Button>
  </Link>;
};

const Wrapper = styled.div`
  * {
      color: ${p => p.theme.colors.text };
    font-family: 'Open Sans';
  }
`;

const Button = styled(ButtonBase)`
  height: 40px;
  width: 25px;
  position: absolute;
  top: 35px;
  left: 20px;
`;

const Header = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0;
  display: block;
  text-align: center;
  letter-spacing: 2px;
`;
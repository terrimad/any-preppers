import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming'
import React from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';

import { Caret, SmugPepe } from './components';
import { Alchemy, Engineering, Professions } from './professions';

const theme = {
  colors: {
    text: '#F7F7F7',
    border: '#F7F7F7',
  },
  font: 'Open Sans',
  labelSize: '68px',
  borderSize: '1px'
};

export default () => {
  return <ThemeProvider theme={theme}>
    <Wrapper>
      <Header>
        any preppers?
        <SmugPepe />
      </Header>

      <Back />
      <Switch>
        <Route path="/" component={Professions} />
        <Route path="/engineering" component={Engineering} />
        <Route path="/alchemy" component={Alchemy} />
      </Switch>
    </Wrapper>
  </ThemeProvider>;
};

const Back = () => {
  const [location] = useLocation();
  if (location === '/') {
    return null;
  }
  return <Link href="/" title="Back">
    <BackLink>
      <Caret />
    </BackLink>
  </Link>;
};

const Wrapper = styled.div`
  * {
    color: ${p => p.theme.colors.text };
    font-family: ${p => p.theme.font };
    font-weight: 300;
  }
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BackLink = styled.a`
  height: 40px;
  width: 25px;
  position: absolute;
  top: 35px;
  left: 20px;
`;

const Header = styled.h1`
  font-size: 50px;
  padding: 20px 0;
  margin: 0;
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

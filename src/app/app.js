import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming'
import React from 'react';
import { Link, Route, Switch } from 'wouter';

import { SmugPepe } from './components';
import { Alchemy, Engineering, Professions } from './crafting';
import { Home } from './home';

const theme = {
  font: 'Open Sans',
  textColor: '#F7F7F7',
  amountLabelSize: '68px',
  boxLabelSize: '30px',
  circleSize: '80px',
  circleThickness: 2,
};

export default () => {
  return <ThemeProvider theme={theme}>
    <Wrapper>
      <Header>
        <Link to="/">
          <a title="Home">
            any preppers?
          <SmugPepe />
          </a>
        </Link>
      </Header>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/crafting" component={Professions} />
        <Route path="/crafting/engineering" component={Engineering} />
        <Route path="/crafting/alchemy" component={Alchemy} />
      </Switch>
    </Wrapper>
  </ThemeProvider>;
};

const Wrapper = styled.div`
  * {
    color: ${p => p.theme.textColor };
    font-family: ${p => p.theme.font };
    font-weight: 400;
  }
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.h1`
  font-size: 50px;
  padding: 20px 0;
  margin: 0 0 20px;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 700;
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }
`;

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming'
import React from 'react';
import { Link, Route, Router, Switch } from 'wouter';

import { SmugPepe } from './components';
import { Profession, Professions } from './consumables';
import { Home } from './home';
import { TimezoneContext, useLocation, useTabbing } from './utils';

const theme = {
  font: 'Open Sans',

  textColor: '#F7F7F7',
  hordeColor: '#CF1F1F',
  allianceColor: '#3468CF',

  titleFontWeight: '400',
  textFontWeight: '300',
  amountLabelSize: '68px',
  boxLabelSize: '30px',

  circleSize: '80px',
  circleThickness: 2,
};

export default () => {
  const tabbing = useTabbing();

  return <Router hook={useLocation}>
    <TimezoneContext.Provider value="Europe/Stockholm">
      <ThemeProvider theme={{ ...theme, tabbing }}>
        <Wrapper>
          <Header>
            <Link to="/">
              <a tabIndex="0" title="Home">
                any preppers?
              <SmugPepe />
              </a>
            </Link>
          </Header>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/consumables" component={Professions} />
            <Route path="/consumables/engineering">
              <Profession profession="engineering" label="Engineering" />
            </Route>
            <Route path="/consumables/alchemy">
              <Profession profession="alchemy" label="Alchemy" />
            </Route>
            <Route path="/consumables/blacksmithing">
              <Profession profession="blacksmithing" label="Blacksmithing" />
            </Route>
          </Switch>
        </Wrapper>
      </ThemeProvider>
    </TimezoneContext.Provider>
  </Router>;
};

const Wrapper = styled.div`
  * {
      color: ${p => p.theme.textColor };
    font-family: ${p => p.theme.font };
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
  text-shadow: 2px 2px 4px #000000;
  a {
      display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    &:focus {
      ${p => focusStyling(p) }
    }
  }
`;

export const focusStyling = p => css`
  ${p.theme.tabbing ?
    `
    outline: 1px solid ${p.theme.textColor };
    outline-offset: 5px;
  ` :
    'outline: none;' }
`;
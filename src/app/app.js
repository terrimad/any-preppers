import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming'
import React, { useMemo } from 'react';
import { Link, Route, Router, Switch } from 'wouter';

import { SmugPepe } from './components';
import { Profession, Professions } from './consumables';
import { Home } from './home';
import { StorageProvider, StorageProviderContext, TimezoneContext, useLocation, useTabbing } from './utils';

const theme = {
  font: 'Open Sans',

  backgroundColor: '#141414',
  textColor: '#F7F7F7',
  hordeColor: '#CF1F1F',
  allianceColor: '#3468CF',

  titleFontWeight: '400',
  textFontWeight: '300',
  amountLabelSize: '68px',
  boxLabelSize: '30px',

  circleSize: '90px',
  circleThickness: 3,
};

const globalCss = () => css`
  html {
    box-sizing: border-box;
    font-size: 16px;
    background-color: ${theme.backgroundColor };
  }

  html,
  body,
  #root {
    height: 100%;

    &::-webkit-scrollbar {
      width: 4px;
    }
  
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.textColor };
    }
  }

  

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol,
  ul {
    list-style: none;
  }

  #root {
    transition: filter 200ms ease-out;

    &.blur {
      filter: blur(10px);
    }
  }
`;

export default () => {
  const tabbing = useTabbing();
  const storageProvider = useMemo(() => new StorageProvider(), []);
  return <Router hook={useLocation}>
    <StorageProviderContext.Provider value={storageProvider}>
      <TimezoneContext.Provider value="Europe/Stockholm">
        <ThemeProvider theme={{ ...theme, tabbing }}>
          <Global styles={globalCss} />
          <Wrapper>
            <Header>
              <Link to="/">
                <a tabIndex="0" title="Home">
                  Any Preppers?
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
    </StorageProviderContext.Provider>
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
    img {
      display: none;
      margin: 0 0 0 15px;
    }
    
    @media only screen and (min-width: 500px) {
      img {
        display: block;
      }
    }
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
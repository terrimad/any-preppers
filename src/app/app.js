import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming'
import { Engineering } from './professions';

export default function App () {
  return <ThemeProvider theme={{
    colors: {
      text: '#A7A7A7',
      border: '#A7A7A7',
    },
  }}>
    <Wrapper>
      <Header>Crafty</Header>
      <Engineering />
    </Wrapper>
  </ThemeProvider>;
};

const Wrapper = styled.div`
  * {
    color: ${p => p.theme.colors.text };
    font-family: 'Open Sans';
  }
`;

const Header = styled.h1`
  font-size: 50px;
  font-weight: 300;
  padding: 20px 0;
  display: block;
  text-align: center;
  letter-spacing: 2px;
`;
import React from 'react';
import styled from '@emotion/styled';

export default () => {
  return <Svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0" y="0" viewBox="0 0 36.1 65.6" space="preserve">
    <path fill="#84C9CD" d="M34 65.6l1.9-1.9-32-30.8L36.1 2l-1.9-2L0 32.9z" />
  </Svg>;
};

const Svg = styled.svg`
  height: 100%;
  width: 100%;
  stroke: ${p => p.theme.colors.text };
  path {
    fill: ${p => p.theme.colors.text };
  }
`;
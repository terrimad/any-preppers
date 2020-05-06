import styled from '@emotion/styled';
import React from 'react';

export default ({ label = '' }) => {
  return <Label>{label}</Label>;
};

const Label = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  font-weight: ${p => p.theme.titleFontWeight };
  line-height: calc(${p => p.theme.boxLabelSize } + 10px);
  height: calc(${p => p.theme.boxLabelSize } + 10px);
  font-size: ${p => p.theme.boxLabelSize };
  text-shadow: 2px 2px 4px #000000;
`;
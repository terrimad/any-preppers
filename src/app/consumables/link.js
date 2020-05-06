import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'wouter';

import { focusStyling } from '../app';
import { Box, Title } from '../components';
import Image from '../images/consumables.png';

export default () => {
  return <Link href="/consumables">
    <Hyperlink tabIndex="0">
      <Box
        image={Image}>
        <Title label="Consumables" />
        <Description>
          Tool for calculation of materials when crafting
        </Description>
      </Box>
    </Hyperlink>
  </Link>
};


const Description = styled.p`
  margin: 15px 30px;
  > span {
    display: block;
  }
`;

const Hyperlink = styled.a`
  &:focus {
    outline: none;
    > div {
      ${p => focusStyling(p) }
    }
  } 
`;
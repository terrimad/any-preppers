import styled from '@emotion/styled';
import React from 'react';

import SmugPepe from '../images/smug-pepe.png';

export default () => <Img src={SmugPepe} />;

const Img = styled.img`
  height: 80px;
`;
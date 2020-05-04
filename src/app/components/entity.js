import styled from '@emotion/styled';
import React from 'react';

import { crafting } from '../db.json';
import { useRefreshLinks } from '../utils';

export default ({ id, ...other }) => {
  const item = crafting[id];
  useRefreshLinks();

  if (!item) {
    return null;
  }

  return <Item
    {...other}
    target="_blank"
    href={`https://classic.wowhead.com/${ item.type }=${ item.id }`}
  />;
}

export const Amount = styled.span`
  font-size: ${p => `calc(${ p.theme.labelSize }/2)` };
  line-height: ${p => p.theme.labelSize };
`;

const Item = styled.a`
`;
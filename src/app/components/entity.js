import styled from '@emotion/styled';
import React from 'react';

import { focusStyling } from '../app';
import { crafting } from '../db.json';
import { useRefreshLinks } from '../utils';

export default ({ id, ...other }) => {
  const item = crafting[id];
  useRefreshLinks();

  if (!item) {
    return null;
  }

  return <Hyperlink
    {...other}
    target="_blank"
    href={`https://classic.wowhead.com/${ item.type }=${ item.id }`}
  />;
}

export const Amount = styled.span`
  font-size: ${p => `calc(${ p.theme.amountLabelSize }/2)` };
  line-height: ${p => p.theme.amountLabelSize };
  font-weight: ${p => p.theme.titleFontWeight };
`;

const Hyperlink = styled.a`
  &:focus {
    ${p => focusStyling(p) }
  } 
`;
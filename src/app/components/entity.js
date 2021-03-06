import styled from '@emotion/styled';
import React from 'react';

import { focusStyling } from '../app';
import { useRefreshLinks } from '../utils';

export default ({ id, icon, type = 'item', ...other }) => {
  useRefreshLinks();

  if (!id) {
    return null;
  }

  return <Hyperlink
    {...other}
    target="_blank"
    href={`https://classic.wowhead.com/${ type }=${ id }`}>
    <img alt={`${icon}_icon`} src={`https://wow.zamimg.com/images/wow/icons/large/${ icon }.jpg`} />
  </Hyperlink>;
}

export const Amount = styled.span`
  font-size: ${p => `calc(${ p.theme.amountLabelSize }/2)` };
  line-height: ${p => p.theme.amountLabelSize };
  font-weight: ${p => p.theme.titleFontWeight };
  line-height: normal;
  margin: 8px 0 0 0;
`;

const Hyperlink = styled.a`
  &:focus {
    ${p => focusStyling(p) }
  }
  img {
    display: block;
    ${p => p.theme.borderColor && `border: 1px solid ${ p.theme.borderColor };` }
  }
`;
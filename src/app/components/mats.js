import styled from '@emotion/styled';
import React from 'react';

import { List as ListBase, ListItem } from './craftables';
import Entity, { Amount } from './entity';

export default ({ mats = {} }) => {
  if (Object.keys(mats).length === 0) {
    return null;
  }

  return <List>
    {Object
      .keys(mats)
      .sort()
      .map(key => {
        return <ListItem key={key}>
          <Entity id={key} />
          <Amount>{mats[key]}x</Amount>
        </ListItem>;
      })}
  </List>;
};

const List = styled(ListBase)`
  border-top: 1px solid ${p => p.theme.textColor };
  
  overflow-y: overlay;
  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.textColor };
  }
`;
import styled from '@emotion/styled';
import React from 'react';

import Entity, { Amount as AmountBase } from './entity';

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

const List = styled.ul`  
  padding: 20px 10%;
  list-style: none;
  border-top: 1px solid ${p => p.theme.textColor };
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
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

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 15px;
  text-align: center;
`;

const Amount = styled(AmountBase)`
  line-height: normal;
  margin: 15px 0 0 0;
`;
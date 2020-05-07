import styled from '@emotion/styled';
import React, { useCallback } from 'react';

import { useRefreshLinks } from '../utils';
import Entity, { Amount } from './entity';

export default ({
  multipliers = {},
  items = {},
  update = () => { }
}) => {
  useRefreshLinks();

  const handleInteraction = useCallback(
    (e, key) => {
      update(e, key);
    },
    [update],
  );

  const filteredItems = Object
    .keys(items)
    .sort()
    .reduce(
      (acc, curr) => {
        if (items[curr] > 0) {
          acc[curr] = items[curr];
        }

        return acc;
      },
      {},
    );

  return <>
    <List>
      {Object
        .keys(items)
        .sort()
        .map((key) => {
          return <ListItem key={key}>
            <Entity
              id={key}
              onWheel={e => handleInteraction(e, key)}
              onKeyDown={e => handleInteraction(e, key)} />
          </ListItem>
        })}
    </List>
    <Mats mats={filteredItems} />
  </>;
};

export const Mats = ({ mats = {} }) => {
  if (Object.keys(mats).length === 0) {
    return null;
  }

  return <MatsList>
    {Object
      .keys(mats)
      .sort()
      .map(key => {
        return <ListItem key={key}>
          <Entity id={key} />
          <Amount>{mats[key]}x</Amount>
        </ListItem>;
      })}
  </MatsList>;
};

export const List = styled.ul`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 8px;
  text-align: center;
`;

export const MatsList = styled(List)`
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
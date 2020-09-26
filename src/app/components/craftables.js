import styled from '@emotion/styled';
import React, { useCallback } from 'react';

import { useEntityDb, useRefreshLinks } from '../utils';
import Entity, { Amount } from './entity';

export default ({
  multipliers = {},
  items = {},
  update = () => { }
}) => {
  const entityDb = useEntityDb();
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
          const item = entityDb[key];

          if (!item) {
            return null;
          }

          return <ListItem key={key}>
            <Entity
              id={key}
              icon={item.icon}
              onWheel={e => handleInteraction(e, key)}
              onKeyDown={e => handleInteraction(e, key)} />
          </ListItem>
        })}
    </List>
    <Mats mats={filteredItems} />
  </>;
};

export const Mats = ({ mats = {} }) => {
  const entityDb = useEntityDb();

  if (Object.keys(mats).length === 0) {
    return null;
  }

  return <MatsList>
    {Object
      .keys(mats)
      .sort()
      .map(key => {
        const item = entityDb[key];

        if (!item) {
          return null;
        }

        return <ListItem key={key}>
          <Entity
            id={key}
            icon={item.icon}
          />
          <Amount>{Math.ceil(mats[key])}x</Amount>
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
  ${p => p.theme.borderColor && `border-top: 1px solid ${ p.theme.borderColor };` }
`;
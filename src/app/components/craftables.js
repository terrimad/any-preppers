import styled from '@emotion/styled';
import React, { useCallback } from 'react';

import EntityBase, { Amount } from './entity';

export default ({
  multipliers = {},
  items = {},
  update = () => { }
}) => {
  const handleInteraction = useCallback(
    (e, key) => {
      update(e, key);
    },
    [update],
  );

  return <List>
    {Object
      .keys(items)
      .map((key) => {
        const amount = items[key];
        const multiplier = multipliers[key] || 1;

        return <ListItem key={key}>
          <Entity
            amount={amount}
            id={key}
            onWheel={e => handleInteraction(e, key)}
            onKeyDown={e => handleInteraction(e, key)} />
          {!!amount && <Amount>{multiplier * amount}x</Amount>}
        </ListItem>
      })}
  </List>;
};

const Entity = styled(EntityBase)`
  transition: 200ms ease-out filter;
  ${p => p.amount === 0 && 'filter: grayscale(1);' }
`;

export const List = styled.ul`
  padding: 20px 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 15px;
  text-align: center;
`;
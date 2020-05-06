import styled from '@emotion/styled';
import React, { useCallback } from 'react';

import EntityBase, { Amount as AmountBase } from './entity';

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

  return <Wrapper>
    <List>
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
    </List>
  </Wrapper>;
};

const Entity = styled(EntityBase)`
  transition: 200ms ease-out filter;
  ${p => p.amount === 0 && 'filter: grayscale(1);' }
`;

const Wrapper = styled.div`
  padding: 20px 10%;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
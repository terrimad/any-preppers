import styled from '@emotion/styled';
import React from 'react';

import EntityBase, { Amount as AmountBase } from './entity';

export default ({
  multipliers = {},
  items = {},
  onScroll = () => { }
}) => {
  return <Wrapper>
    <List>
      {Object
        .keys(items)
        .map((key) => {
          const amount = items[key];
          const multiplier = multipliers[key] || 1;

          return <ListItem key={key}>
            <Entity amount={amount} id={key} onWheel={(e) => onScroll(e, key)} />
            {!!amount && <Amount>{multiplier * amount}x</Amount>}
          </ListItem>
        })}
    </List>
  </Wrapper>;
};

const Entity = styled(EntityBase)`
  transition: 200ms ease-out filter;
  ${p => p.amount === 0 && 'filter: grayscale(1);'}
`;

const Wrapper = styled.div`
  padding: 20px 20%;
`;

const List = styled.ul`
  display: flex;
  justify-content: center;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
  text-align: center;
`;

const Amount = styled(AmountBase)`
  line-height: normal;
  margin: 15px 0 0 0;
`;
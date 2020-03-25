import React from 'react';
import styled from '@emotion/styled';
import db from '../db.json';
import Entity, { Amount as AmountBase } from './entity';

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
            <Button
              onWheel={(e) => onScroll(e, key)}>
              <Entity id={key} />
            </Button>
            {!!amount && <Amount>{multiplier * amount}x</Amount>}
          </ListItem>
        })}
    </List>
  </Wrapper>;
};

const Wrapper = styled.div`
  padding: 20px 20%;
  border-top: ${p => `${ p.theme.borderSize } solid ${ p.theme.colors.border }` };
  border-bottom: ${p => `${ p.theme.borderSize } solid ${ p.theme.colors.border }` };
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  &:not(:last-of-type) {
    margin: 0 15px 0 0;
  }
  text-align: center;
`;

const Amount = styled(AmountBase)`
  line-height: normal;
  margin: 15px 0 0 0;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  background-color: transparent;
  transition: 200ms ease-out transform;
  &:hover {
    transform: scale(1.05);
  }
`;
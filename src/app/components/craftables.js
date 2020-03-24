import React from 'react';
import styled from '@emotion/styled';
import Symbol from './symbols';

const Wrapper = styled.div`
  padding: 20px 20%;
  border-top: 1px solid ${p => p.theme.colors.border };
  border-bottom: 1px solid ${p => p.theme.colors.border };
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  &:not(:last-of-type) {
    margin-right: 15px;
  }
`;

const Button = styled.button`
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

const Amount = styled.span`
  font-size: 30px;
  margin: 20px 0 0;
  text-align: center;
  display: block;
`;

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
          return <Item key={key}>
            <Button
              onWheel={(e) => onScroll(e, key)}>
              <Symbol image={key} />
            </Button>
            {!!amount &&
              <Amount>
                {multiplier * amount}x
            </Amount>}
          </Item>
        })}
    </List>
  </Wrapper>;
};
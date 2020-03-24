import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming'
import items from './items.json';
import Explosives from './explosives';
import Mats from './mats';

const Wrapper = styled.div`
  * {
    color: ${p => p.theme.colors.text };
    font-family: 'Open Sans';
  }
`;

const Header = styled.h1`
  font-size: 50px;
  font-weight: 300;
  padding: 20px 0;
  display: block;
  text-align: center;
  letter-spacing: 2px;
`;

const getMats = (key, multiplier = 1, mats = {}) => {
  const item = items[key];

  if (item) {
    Object
      .keys(item)
      .forEach((key) => {
        const amount = item[key];
        if (items[key]) {
          getMats(key, amount, mats);
        } else if (mats[key]) {
          mats[key] = mats[key] + (amount * multiplier);
        } else {
          mats[key] = (amount * multiplier);
        }
      });
  }

  return mats;
}

const calculateMats = (items) => {
  const mats = {};
  Object
    .keys(items)
    .forEach((key) => {
      const amount = items[key];
      if (amount > 0) {
        const subMats = getMats(key);

        if (amount > 1) {
          Object
            .keys(subMats)
            .forEach((key) => {
              subMats[key] = subMats[key] * amount;
            });
        }

        mats[key] = subMats;
      }
    });

  return mats;
};

export default function App () {
  const [mats, setMats] = useState({});
  const [items, setItems] = useState({
    'goblin-sapper-charge': 0,
    'thorium-grenade': 0,
    'dense-dynamite': 0,
  });

  const handleMats = (event, key) => {
    const newItems = Object.assign({}, items);
    if (event.nativeEvent.wheelDelta > 0) {
      newItems[key]++;
    } else if (newItems[key] > 0) {
      newItems[key]--;
    }
    setItems(newItems);

    const mats = {};
    const calculatedMats = calculateMats(newItems);

    Object
      .keys(calculatedMats)
      .forEach((key) => {
        const newMats = calculatedMats[key];
        Object
          .keys(newMats)
          .forEach((key) => {
            if (mats[key]) {
              mats[key] = mats[key] + newMats[key];
            } else {
              mats[key] = newMats[key];
            }
          });
      });

    setMats(mats);
  };

  return <ThemeProvider theme={{
    colors: {
      text: '#A7A7A7',
      border: '#A7A7A7',
    },
  }}>
    <Wrapper>
      <Header>Crafty</Header>
      <Explosives items={items} onScroll={handleMats} />
      <Mats mats={mats} />
    </Wrapper>
  </ThemeProvider>;
};
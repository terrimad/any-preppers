import React, { useState } from 'react';
import { Craftables, Mats } from '../components'
import { getMats, calculateMats } from '../utils';

export default () => {
  const [mats, setMats] = useState({});
  const [items, setItems] = useState({
    'goblin-sapper-charge': 0,
    'thorium-grenade': 0,
    'dense-dynamite': 0,
  });
  const multipliers = {
    'thorium-grenade': 3,
    'dense-dynamite': 2,
  };

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

  return <>
    <Craftables multipliers={multipliers} items={items} onScroll={handleMats} />
    <Mats mats={mats} />
  </>;
}
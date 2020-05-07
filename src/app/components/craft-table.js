import styled from '@emotion/styled';
import React from 'react';

import db from '../db.json';
import Goyim from '../images/goyim.png';
import { useMats, useRefreshLinks } from '../utils';
import Craftables, { Mats } from './craftables';

const goyimCheck = (items) => {
  return Object
    .keys(items)
    .reduce(
      (acc, curr) => {
        if (acc) {
          return acc;
        }

        if (items[curr] > 0 && db.crafting.goyim.indexOf(curr) > -1) {
          return true;
        }

        return acc;
      },
      false,
    );
};

export default ({ profession }) => {
  useRefreshLinks();

  const [mats, items, handleMats] = useMats(profession);

  return <>
    <Craftables items={items} update={handleMats} />
    <Mats mats={mats} />
    <Img shown={goyimCheck(items).toString()} src={Goyim} />
  </>
}

const Img = styled.img`
  position: absolute;
  height: 150px;
  transition: bottom 200ms ease-out, left 200ms ease-out;
  ${p => p.shown === 'true' ?
    `
      bottom: -35px;
      left: -35px;
    ` :
    `
      bottom: -150px;
      left: -135px;
    `
  }
`;
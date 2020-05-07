import styled from '@emotion/styled';
import React from 'react';

import db from '../db.json';
import Goyim from '../images/goyim.png';
import { useMats, useRefreshLinks } from '../utils';
import Craftables, { Mats } from './craftables';
import Helper from './helper';

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
    <Helper />
    <Craftables items={items} update={handleMats} />
    <Mats mats={mats} />
    <Img shown={goyimCheck(items).toString()} src={Goyim} />
  </>
}

const Img = styled.img`
  position: absolute;
  bottom: 0px;
  height: 150px;
  transition: left 100ms ease-out;
  left: -135px;
  ${p => p.shown === 'true' && `
      @media only screen and (min-width: 1000px) {
        left: -35px;
      }
    `
  }
`;
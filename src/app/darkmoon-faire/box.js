import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { Countdown, HomeBox } from '../components';
import db from '../db.json';
import DarkmoonFaireImage from '../images/darkmoon-faire.png';

export default () => {
  const [month, setMonth] = useState();
  const {
    'darkmoon-faire': dmfDb,
  } = db;
  useEffect(
    () => {
      const month = moment(new Date()).format('MMM');
      if (month) {
        setMonth(dmfDb[month.toLowerCase()]);
      }
    },
    [dmfDb],
  );

  if (!month) {
    return null;
  }


  return <HomeBox
    title="Darkmoon Faire"
    image={DarkmoonFaireImage}>
    <Countdown timeTillDate={month.ends} />
  </HomeBox>
};
import styled from '@emotion/styled';
import moment from 'moment-timezone';
import React, { useMemo } from 'react';

import { Box, Countdown, Title } from '../components';
import DarkmoonFaireImage from '../images/darkmoon-faire.jpg';
import { useTimezone } from '../utils';
import getMonth from './get-month';

export default () => {
  const timezone = useTimezone();
  const {
    up,
    location,
    nextDate,
  } = useMemo(
    () => {
      const month = getMonth(timezone);
      if (month) {
        const tzMoment = (date = moment.now()) => moment(date).tz(timezone);

        const {
          current,
          next,
        } = month;

        const now = tzMoment();
        const currentMonthStarts = tzMoment(current.starts);
        const currentMonthEnds = tzMoment(current.ends);

        if (now < currentMonthStarts) {
          // next dmf is this month
          return {
            up: false,
            location: current.location,
            nextDate: currentMonthStarts,
          }
        } else if (now > currentMonthStarts && currentMonthEnds > now) {
          // dmf is in progress
          return {
            up: true,
            location: current.location,
            nextDate: currentMonthEnds,
          }
        }

        const nextMonthStarts = tzMoment(next.starts);

        return {
          up: false,
          location: next.location,
          nextDate: nextMonthStarts,
        }
      }

      return month;
    },
    [],
  );


  return <Box
    image={DarkmoonFaireImage}>
    <Title label="Darkmoon Faire" />
    <Description>
      {up ?
        <span>
          Currently up in <Location location={location}> {location}</Location>, ends in:
        </span> :
        <span>
          Currently down, starts in <Location location={location}> {location} </Location>in:
        </span>}
    </Description>
    <Countdown timeTillDate={nextDate} />
  </Box>
};

const Description = styled.p`
  margin: 15px 0;
  > span {
    display: block;
  }
`;

const Location = styled.span`
  font-weight: 700;
  color: ${p => p.location === 'Mulgore' ? p.theme.hordeColor : p.theme.allianceColor };
`;
import styled from '@emotion/styled';
import moment from 'moment-timezone';
import React, { useCallback, useEffect, useState } from 'react';

import { mapNumber, useTimezone } from '../utils';
import Circle from './circle';

export default ({ timeTillDate }) => {
  const timezone = useTimezone();
  const [state, setState] = useState({});

  const update = useCallback(
    () => {
      const now = moment().tz(timezone);
      const days = timeTillDate.diff(now, 'days').toString();
      const countdown = moment(timeTillDate - now);
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');

      setState({ days, hours, minutes, seconds });
    },
    [setState, timeTillDate],
  );

  useEffect(
    () => {
      update();
      const interval = setInterval(update, 1000);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      }
    },
    [update],
  );

  const { days, hours, minutes, seconds } = state;

  if (typeof days === 'undefined' ||
    typeof hours === 'undefined' ||
    typeof minutes === 'undefined' ||
    typeof seconds === 'undefined' ||
    !seconds) {
    return null;
  }

  const daysRadius = mapNumber(days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  return <Wrapper>
    {days &&
      <Item>
        <Circle radius={daysRadius} />
        {days}
        <span>days</span>
      </Item>}
    {hours &&
      <Item>
        <Circle radius={hoursRadius} />
        {hours}
        <span>hours</span>
      </Item>}
    {minutes &&
      <Item>
        <Circle radius={minutesRadius} />
        {minutes}
        <span>minutes</span>
      </Item>}
    {seconds &&
      <Item>
        <Circle radius={secondsRadius} />
        {seconds}
        <span>seconds</span>
      </Item>}
  </Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Item = styled.div`
  color: ${p => p.theme.textColor };
  font-size: calc(${p => p.theme.circleSize } / 2.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 30px;
  margin: calc(${p => p.theme.circleSize } / 10);
  padding: calc(${p => p.theme.circleSize } / 10) 0 0;
  position: relative;
  width: ${p => p.theme.circleSize };
  height: ${p => p.theme.circleSize };
  span {
    color: ${p => p.theme.textColor };
    font-size: calc(${p => p.theme.circleSize } / 8);
    font-weight: 600;
    text-transform: uppercase;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: ${p => p.theme.circleSize };
    height: ${p => p.theme.circleSize };
    path {
      stroke: ${p => p.theme.textColor };
    }
  }
`;
import { useTheme } from 'emotion-theming';
import React from 'react';

import { describeArc } from '../utils';

export default ({ radius }) => {
  const {
    circleSize = '80px',
    circleThickness = 4,
  } = useTheme();
  const size = parseInt(circleSize);

  return <svg>
    <path fill="none" strokeWidth={circleThickness} d={describeArc(size / 2, size / 2, (size / 2) - 2, 0, radius)} />
  </svg>;
};
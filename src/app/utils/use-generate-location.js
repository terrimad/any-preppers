import { useCallback } from 'react';
import { useLocation } from 'wouter';

export default () => {
  const [location] = useLocation();

  const generateLocation = useCallback(
    (suffix = '') => {
      return `${ location }${ suffix }`;
    },
    [],
  );

  return generateLocation;
};
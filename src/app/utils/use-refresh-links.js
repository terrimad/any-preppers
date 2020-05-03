import { useEffect } from 'react';

export default () => {
  useEffect(
    () => {
      const { WH: wowhead, $WowheadPower: power } = window;
      if (power && typeof power.refreshLinks === 'function' && wowhead.getDataEnv) {
        power.refreshLinks()
      }
    },
    [],
  );
};
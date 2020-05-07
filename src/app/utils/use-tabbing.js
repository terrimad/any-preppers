import { useEffect, useState } from 'react';

const tabbables = [
  'A',
  'INPUT',
  'BUTTON',
  'TEXTAREA',
];

export default () => {
  const [tabbing, setTabbing] = useState(false);

  useEffect(
    () => {
      const listener = (event) => {
        if (event.key) {
          setTabbing(true);

          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            const tabbableElements = Array
              .from(document.body.querySelectorAll('*'))
              .filter(el => tabbables.indexOf(el.tagName) > -1);
            const currentFocus = document.activeElement;
            if (currentFocus === document.body) {
              tabbableElements[0].focus();
            } else {
              const index = tabbableElements.indexOf(currentFocus);

              if (index > -1) {
                if (event.key === 'ArrowRight') {
                  (tabbableElements[index + 1] || tabbableElements[0]).focus();
                } else {
                  (tabbableElements[index - 1] || tabbableElements[tabbableElements.length - 1]).focus();
                }
              }
            }
          }
        } else {
          setTabbing(false);
        }
      };

      document.addEventListener('keydown', listener);
      document.addEventListener('click', listener);

      return () => {
        document.removeEventListener('keydown', listener);
        document.removeEventListener('click', listener);
      };
    },
    [setTabbing],
  );

  return tabbing;
};
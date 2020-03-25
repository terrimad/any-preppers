import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import convert from 'htmr';
import db from '../db.json';

const Tooltip = ({ tooltip, shown, icon }) => {
  if (!tooltip || !shown) {
    return null;
  }

  return <Portal>
    <Tip>
      {convert(tooltip)}
    </Tip>
  </Portal>;
}

const Portal = ({ children }) => {
  const element = document.createElement('div');
  element.classList.add('portal');

  useEffect(
    () => {
      document.body.appendChild(element);

      return () => {
        document.body.removeChild(element);
      }
    },
    [],
  );

  return createPortal(children, element);
}

const useItem = (entity) => {
  const [item, setItem] = useState(null);

  useEffect(
    () => {
      if (entity) {
        const { id, type } = entity;
        fetch(`https://classic.wowhead.com/tooltip/${ type }/${ id }`)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
            return Promise.resolve();
          })
          .then((data) => {
            if (data) {
              const { icon, tooltip } = data;
              setItem({ icon, tooltip });
            }
          });
      }
    },
    [entity],
  );

  return item;
}

export default ({ id }) => {
  const entity = db[id];
  const [hover, setHover] = useState(false);
  const item = useItem(entity);

  if (!item) {
    return null;
  }

  const { tooltip, icon } = item;

  return <Item
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}>
    {tooltip && <Tooltip
      shown={hover}
      tooltip={tooltip} />}
    <Img src={`https://wow.zamimg.com/images/wow/icons/medium/${ icon }.jpg`} />
  </Item>;
}

export const Amount = styled.span`
  font-size: ${p => `calc(${ p.theme.iconSize }/2)` };
  line-height: ${p => p.theme.iconSize };
`;

const Item = styled.div`
  border: ${p => `${ p.theme.borderSize } solid ${ p.theme.colors.border }` };
  border-radius: ${p => p.theme.borderRadius };
  width: ${p => p.theme.iconSize };
  height: ${p => p.theme.iconSize };
  box-shadow: 2px 2px 5px -1px rgba(0,0,0,0.39);
  overflow: hidden;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  z-index: -1;
  transform: scale(1.05);
`;

const Tip = styled.div`
  * {
    font-family: ${p => p.theme.font };
    color: ${p => p.theme.colors.text };
    text-decoration: none;
  }
  padding: 5px 10px;
  max-width: 400px;
  z-index: 50;
  background: #222222;
  border: ${p => `${ p.theme.borderSize } solid ${ p.theme.colors.border }` };
  border-radius: ${p => p.theme.borderRadius };

  position: fixed;
  bottom: 40px;
  right: 40px;
`;
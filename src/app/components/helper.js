import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { focusStyling } from '../app';
import Pepega from '../images/pepega.png';
import { useStorageProvider } from '../utils';
import Title from './title';

export default () => {
  const { local } = useStorageProvider();
  const storedValue = local.get('has-read-how-to-basic');
  const [hasConfirmed, setHasConfirmed] = useState(!!storedValue)

  useEffect(
    () => {
      const root = document.getElementById('root');
      if (!hasConfirmed) {
        root?.classList.add('blur');
      } else {
        root?.classList.remove('blur');
      }
    },
    [hasConfirmed],
  );

  const toggleConfirm = useCallback(
    () => {
      setHasConfirmed(!hasConfirmed);
      local.set('has-read-how-to-basic', !hasConfirmed)
    },
    [hasConfirmed, setHasConfirmed],
  );

  const modal = document.getElementById('modal');

  if (!modal) {
    return null;
  }

  if (hasConfirmed) {
    return <HelpToggler onClick={toggleConfirm} title="How did this work again?">
      <img src={Pepega} />
    </HelpToggler>;
  }

  return createPortal(
    <Wrapper>
      <Title label="How to basic" />
      <p>
        Hover over an item in the top row and scroll, or use tab and arrow keys, to add or remove an item.
      </p>
      <Confirm onClick={toggleConfirm}>OK</Confirm>
    </Wrapper>,
    modal,
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 500px;
  top: 200px;
  left: calc(50% - 250px);
  background-color: ${p => p.theme.backgroundColor };
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 4px #000000;
  h2, p {
    color: ${p => p.theme.textColor };
    font-family: ${p => p.theme.font };
    margin: 0 0 15px;
    text-align: left;
  }
  z-index: 3;
`;

const Confirm = styled.button`
  padding: 8px 30px;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  outline: none;
  display: block;
  margin: 0 0 0 auto;
  transition: background-color 200ms ease-out, color 200ms ease-out;
  background-color: ${p => p.theme.textColor };
  color: ${p => p.theme.backgroundColor };
  &:hover {
    background-color: ${p => p.theme.backgroundColor };
    color: ${p => p.theme.textColor };
  }
  &:focus {
    ${p => focusStyling(p) }
  }
`;

const HelpToggler = styled.button`
  position: absolute;
  top: 3px;
  right: 10px;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  width: 60px;
  &:focus {
    ${p => focusStyling(p) }
  }
  img {
    max-width: 100%;
  }
`;
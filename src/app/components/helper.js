import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { focusStyling } from '../app';
import { useStorageProvider } from '../utils';
import Title from './title';

export default () => {
  const { local } = useStorageProvider();
  const storedValue = local.get('has-read-any-preppers-how-to-basic');
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

  const onConfirm = useCallback(
    () => {
      setHasConfirmed(true);
      local.setItem('has-read-any-preppers-how-to-basic', true)
    },
    [setHasConfirmed],
  );

  const modal = document.getElementById('modal');

  if (!modal || hasConfirmed) {
    return null;
  }

  return createPortal(
    <Wrapper>
      <Title label="How to basic" />
      <p>
        Hover over an item in the top row and scroll, or use tab and arrow keys, to add or remove an item.
      </p>
      <Confirm onClick={onConfirm}>OK</Confirm>
    </Wrapper>,
    modal,
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 500px;
  top: 200px;
  left: calc(50% - 250px);
  background-color: #141414;
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
  color: #141414;
  &:hover {
    background-color: transparent;
    color: ${p => p.theme.textColor };
  }
  &:focus {
    ${p => focusStyling(p) }
  }
`;
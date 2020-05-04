import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'wouter';

import CraftingImageBlur from '../images/crafting-blur.png';
import CraftingImage from '../images/crafting.png';

export default () => {
  return <Link href="/crafting">
    <Hyperlink>
      <span>crafting</span>
      <img src={CraftingImage} />
      <img src={CraftingImageBlur} />
    </Hyperlink>
  </Link>
};

const Hyperlink = styled.a`
  height: 100%;
  display: block;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  img {
    display: block;
  }
  img:last-of-type {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 200ms ease-out;
  }
  span {
    display: block;
    width: 100%;
    text-align: center;
    line-height: 50px;
    height: 50px;
    position: absolute;
    top: calc(50% - 25px);
    font-size: 40px;
    text-decoration: none;
    z-index: 50;
    opacity: 0;
    transition: opacity 200ms ease-out;
  }
  &:hover {
    img:last-of-type, span {
      opacity: 1;
    }
  }
`;
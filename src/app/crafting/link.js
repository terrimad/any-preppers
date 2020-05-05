import React from 'react';
import { Link } from 'wouter';

import { HomeBox } from '../components';
import CraftingImage from '../images/crafting.png';

export default () => {
  return <Link href="/crafting">
    <a>
      <HomeBox
        title="Crafting"
        image={CraftingImage}
      />
    </a>
  </Link>
};

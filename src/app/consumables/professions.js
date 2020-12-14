import React from 'react';
import { Link } from 'wouter';

import { Entity, List, ListItem, Title } from '../components';

export default () => {

  return <>
    <Title label="Professions" />
    <List>
      <ListItem>
        <Link href="/consumables/engineering">
          <Entity id="12656" icon="trade_engineering" type="spell" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/alchemy">
          <Entity id="11611" icon="trade_alchemy" type="spell" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/blacksmithing">
          <Entity id="9785" icon="trade_blacksmithing" type="spell" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/cooking">
          <Entity id="18260" icon="inv_misc_food_15" type="spell" />
        </Link>
      </ListItem>
    </List>
  </ >
};
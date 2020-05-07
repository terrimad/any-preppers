import React from 'react';
import { Link } from 'wouter';

import { Entity, List, ListItem, Title } from '../components';

export default () => {

  return <>
    <Title label="Professions" />
    <List>
      <ListItem>
        <Link href="/consumables/engineering">
          <Entity id="12656" type="spell" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/alchemy">
          <Entity id="11611" type="spell" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/blacksmithing">
          <Entity id="9785" type="spell" />
        </Link>
      </ListItem>
    </List>
  </ >
};
import React from 'react';
import { Link } from 'wouter';

import { Entity, List, ListItem, Title } from '../components';

export default () => {

  return <>
    <Title label="Professions" />
    <List>
      <ListItem>
        <Link href="/consumables/engineering">
          <Entity id="engineering" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/alchemy">
          <Entity id="alchemy" />
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/consumables/blacksmithing">
          <Entity id="blacksmithing" />
        </Link>
      </ListItem>
    </List>
  </ >
};
import React from 'react';
import styled from '@emotion/styled';
import GoblinSapperCharge from './images/goblin-sapper-charge.jpg';
import SolidBlastingPowder from './images/solid-blasting-powder.jpg';
import DenseBlastingPowder from './images/dense-blasting-powder.jpg';
import ThoriumGrenade from './images/thorium-grenade.jpg';
import DenseDynamite from './images/dense-dynamite.jpg';
import ThoriumWidget from './images/thorium-widget.jpg';
import UnstableTrigger from './images/unstable-trigger.jpg';
import MithrilBar from './images/mithril-bar.jpg';
import ThoriumBar from './images/thorium-bar.jpg';
import MithrilOre from './images/mithril-ore.jpg';
import DenseStone from './images/dense-stone.jpg';
import SolidStone from './images/solid-stone.jpg';
import ThoriumOre from './images/thorium-ore.jpg';
import MageweaveCloth from './images/mageweave-cloth.jpg';
import Runecloth from './images/runecloth.jpg';
import Engineering from './images/engineering.jpg';

const images = {
  'goblin-sapper-charge': GoblinSapperCharge,
  'solid-blasting-powder': SolidBlastingPowder,
  'dense-blasting-powder': DenseBlastingPowder,
  'thorium-grenade': ThoriumGrenade,
  'dense-dynamite': DenseDynamite,
  'thorium-widget': ThoriumWidget,
  'unstable-trigger': UnstableTrigger,
  'mithril-bar': MithrilBar,
  'thorium-bar': ThoriumBar,
  'mithril-ore': MithrilOre,
  'dense-stone': DenseStone,
  'solid-stone': SolidStone,
  'thorium-ore': ThoriumOre,
  'mageweave-cloth': MageweaveCloth,
  'runecloth': Runecloth,
  'engineering': Engineering,
};

export default ({ image, ...rest }) => {
  return <StyledSpan>
    <StyledImg title={image} src={images[image]} {...rest} />
  </StyledSpan>;
};

export const Amount = styled.span`
  font-size: ${p => `calc(${ p.theme.iconSize }/2)` };
  line-height: ${p => p.theme.iconSize };
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
`;

const StyledSpan = styled.span`
  position: relative;
  display: block;
  border: ${p => `${ p.theme.borderSize } solid ${ p.theme.colors.border }` };
  border-radius: ${p => p.theme.borderRadius };
  width: ${p => p.theme.iconSize };
  height: ${p => p.theme.iconSize };
  overflow: hidden;
  box-shadow: 2px 2px 5px -1px rgba(0,0,0,0.39);
`;
import type { Schema, Attribute } from '@strapi/strapi';

export interface MechanicMechanic extends Schema.Component {
  collectionName: 'components_mechanic_mechanics';
  info: {
    displayName: 'mechanic';
    icon: 'cog';
    description: '';
  };
  attributes: {
    targeting: Attribute.Enumeration<['single', 'aoe']>;
    amountofturns: Attribute.Integer;
    damaging: Attribute.Component<'damaging.damaging'>;
    healing: Attribute.Component<'healing.healing'>;
  };
}

export interface HealingHealing extends Schema.Component {
  collectionName: 'components_healing_healings';
  info: {
    displayName: 'healing';
    icon: 'earth';
  };
  attributes: {
    healingamount: Attribute.Integer;
  };
}

export interface DamagingDamaging extends Schema.Component {
  collectionName: 'components_damaging_damagings';
  info: {
    displayName: 'damaging';
    icon: 'chartBubble';
  };
  attributes: {
    damageaamount: Attribute.Integer;
    ignorevulnerability: Attribute.Boolean;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'mechanic.mechanic': MechanicMechanic;
      'healing.healing': HealingHealing;
      'damaging.damaging': DamagingDamaging;
    }
  }
}

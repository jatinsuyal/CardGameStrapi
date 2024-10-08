// Interface automatically generated by schemas-to-ts

import { Skill } from '../../../skill/content-types/skill/skill';
import { Skill_Plain } from '../../../skill/content-types/skill/skill';
import { AdminPanelRelationPropertyModification } from '../../../../common/schemas-to-ts/AdminPanelRelationPropertyModification';

export interface Character {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    name?: string;
    description?: string;
    imageurl?: string;
    health?: number;
    mana?: number;
    skills: { data: Skill[] };
  };
}
export interface Character_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  description?: string;
  imageurl?: string;
  health?: number;
  mana?: number;
  skills: Skill_Plain[];
}

export interface Character_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  description?: string;
  imageurl?: string;
  health?: number;
  mana?: number;
  skills: number[];
}

export interface Character_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  description?: string;
  imageurl?: string;
  health?: number;
  mana?: number;
  skills: AdminPanelRelationPropertyModification<Skill_Plain>;
}

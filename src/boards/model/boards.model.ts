import { Monster } from '~/monsters/model/monster.model';

export interface CreatorInfo {
  date: number;
  userName: string;
}

export interface PostContent {
  defense: Monster[];
}

import { Monster } from '~/monsters/model/monster.model';

export interface CreateCommentDto {
  id?: number;
  boardId: number;
  comment: Monster[];
}

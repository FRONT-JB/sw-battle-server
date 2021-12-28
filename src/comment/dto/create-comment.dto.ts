import { Monster } from '~/monsters/model/monster.model';

export interface CreateCommentDto {
  boardId: number;
  comment: Monster[];
}

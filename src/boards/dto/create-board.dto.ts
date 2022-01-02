import { PostContent } from '../model/boards.model';

export class CreateBoardDto {
  id?: number;
  content: PostContent;
}

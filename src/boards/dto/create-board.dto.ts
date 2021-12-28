import { CreatorInfo, PostContent } from '../model/boards.model';

export class CreateBoardDto {
  id?: number;
  creator: CreatorInfo;
  content: PostContent;
}

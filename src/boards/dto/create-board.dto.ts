import { CreatorInfo, PostContent } from '../model/boards.model';

export class CreateBoardDto {
  creator: CreatorInfo;
  content: PostContent;
}

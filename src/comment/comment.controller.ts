import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/board/:id')
  getCommentByBoardId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Comment[]> {
    return this.commentService.getCommentByBoardId(id);
  }

  @Post()
  createComment(@Body() create: CreateCommentDto): Promise<Comment> {
    return this.commentService.createComment(create);
  }

  @Delete('/:id')
  deleteComment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commentService.deleteComment(id);
  }
}

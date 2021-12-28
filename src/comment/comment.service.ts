import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepositry: CommentRepository,
  ) {}

  async createComment(create: CreateCommentDto): Promise<Comment> {
    return await this.commentRepositry.createComment(create);
  }

  async getCommentByBoardId(id: number): Promise<Comment[]> {
    return await this.commentRepositry.getCommentByBoardId(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
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

  createComment(create: CreateCommentDto): Promise<Comment> {
    return this.commentRepositry.createComment(create);
  }

  async getCommentByBoardId(id: number): Promise<Comment[]> {
    return await this.commentRepositry.getCommentByBoardId(id);
  }

  async deleteComment(id: number): Promise<void> {
    const result = await this.commentRepositry.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Comment with ${id}`);
    }
  }
}

import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(create: CreateCommentDto): Promise<Comment> {
    const { boardId, comment: commentContent } = create;
    const comment = this.create({
      boardId,
      comment: commentContent,
    });
    await this.save(comment);
    return comment;
  }
  async getCommentByBoardId(id: number): Promise<Comment[]> {
    const found = await this.find({ boardId: id });
    if (!found) {
      throw new NotFoundException(`Can't find Comment with ${id}`);
    }
    return found;
  }
}

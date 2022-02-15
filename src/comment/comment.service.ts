import { BoardsRepository } from './../boards/boards.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    @InjectRepository(BoardsRepository)
    private commentRepository: CommentRepository,
    private boardRepository: BoardsRepository,
  ) {}

  async createComment(create: CreateCommentDto): Promise<Comment> {
    const { boardId } = create;
    const found = await this.boardRepository.getBoardById(boardId);
    if (!found) {
      throw new NotFoundException(`Can't find ${boardId}`);
    }
    return this.commentRepository.createComment(create);
  }

  async getCommentByBoardId(id: number): Promise<Comment[]> {
    return await this.commentRepository.getCommentByBoardId(id);
  }

  async deleteComment(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Comment with ${id}`);
    }
  }
}

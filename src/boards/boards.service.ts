import { FilterQuery } from './model/boards.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './boards.entity';
import { CommentRepository } from '~/comment/comment.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsRepository)
    @InjectRepository(CommentRepository)
    private boardsRepository: BoardsRepository,
    private commentRepository: CommentRepository,
  ) {}

  async getAllBoard(query: FilterQuery): Promise<Board[]> {
    const filterKeyword = Object.values(query);
    const isNotNullKeyword = !!filterKeyword.length;
    if (isNotNullKeyword) {
      const boards = await this.boardsRepository.find();
      const filterdBoard = boards.filter((board) =>
        filterKeyword.every((keyword) => board.keyword.includes(keyword)),
      );
      return filterdBoard;
    }
    return await this.boardsRepository.find();
  }

  createBoard(create: CreateBoardDto): Promise<Board> {
    return this.boardsRepository.createBoard(create);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const comment = await this.commentRepository.find({ boardId: id });
    const board = await this.boardsRepository.delete(id);
    if (board.affected === 0) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }
    if (!!comment.length && board.affected !== 0) {
      await this.commentRepository.delete({ boardId: id });
    }
  }
}

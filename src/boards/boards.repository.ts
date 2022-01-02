import { NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '~/auth/user.entity';

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
  async createBoard(create: CreateBoardDto, user: User): Promise<Board> {
    const { content } = create;
    const keyword = content.defense.map((monster) => monster.name);
    const board = this.create({
      content,
      keyword,
      user,
    });
    await this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }
    return found;
  }
}

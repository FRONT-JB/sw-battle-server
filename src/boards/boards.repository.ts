import { NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
  async createBoard(create: CreateBoardDto): Promise<Board> {
    const { creator, content } = create;
    const keyword = content.defense.map((monster) => monster.name);
    const board = this.create({
      creator,
      content,
      keyword,
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

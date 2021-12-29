import { FilterQuery } from './model/boards.model';
import { BoardsService } from './boards.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardSerivce: BoardsService) {}
  @Get()
  getAllBoard(@Query() query: FilterQuery) {
    return this.boardSerivce.getAllBoard(query);
  }

  @Post()
  createBoard(@Body() create: CreateBoardDto): Promise<Board> {
    return this.boardSerivce.createBoard(create);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardSerivce.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardSerivce.deleteBoard(id);
  }
}

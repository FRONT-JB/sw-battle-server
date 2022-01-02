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
  UseGuards,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '~/auth/utils/get-user.decorator';
import { User } from '~/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardSerivce: BoardsService) {}
  @Get()
  getAllBoard(@Query() query: FilterQuery): Promise<Board[]> {
    return this.boardSerivce.getAllBoard(query);
  }

  @Post()
  createBoard(
    @Body() create: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardSerivce.createBoard(create, user);
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

import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import { CommentRepository } from '~/comment/comment.repository';
import { AuthModule } from '~/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardsRepository, CommentRepository]),
    AuthModule,
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}

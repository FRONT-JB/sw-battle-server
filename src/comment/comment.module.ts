import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonstersModule } from './monsters/monsters.module';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './config/typeorm.config';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    MonstersModule,
    BoardsModule,
    CommentModule,
  ],
})
export class AppModule {}

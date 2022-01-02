import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonstersModule } from './monsters/monsters.module';
import { BoardsModule } from './boards/boards.module';
import { TYPEORM_CONFIG } from './config/typeorm.config';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    MonstersModule,
    BoardsModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '~/auth/user.entity';
import { PostContent } from './model/boards.model';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column('simple-array')
  keyword: string[];

  @Column('simple-json')
  content: PostContent;

  @ManyToOne(() => User, (user) => user.boards, { eager: true })
  user: User;
}

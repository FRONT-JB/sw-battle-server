import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Board } from '~/boards/boards.entity';
import { AuthRole } from './model/auth';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: AuthRole;

  @OneToMany((type) => Board, (board) => board.user, { eager: false })
  boards: Board[];
}

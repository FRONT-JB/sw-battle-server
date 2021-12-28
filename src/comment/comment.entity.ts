import { Monster } from '~/monsters/model/monster.model';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardId: number;

  @Column('simple-json')
  comment: Monster[];
}

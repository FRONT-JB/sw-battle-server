import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatorInfo, PostContent } from './model/boards.model';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  keyword: string[];

  @Column('simple-json')
  creator: CreatorInfo;

  @Column('simple-json')
  content: PostContent;
}

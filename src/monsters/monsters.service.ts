import { Injectable } from '@nestjs/common';
import { findMonster } from '~/api/monster';
import { MonsterResult } from './model/monster.model';

@Injectable()
export class MonstersService {
  async findMonsters(name: string) {
    const searchValue = decodeURI(name).toLowerCase();
    const {
      data: { count, next, previous, results },
    } = await findMonster(searchValue);

    const result: MonsterResult = {
      count,
      next,
      previous,
      results: results?.filter(
        (monster) => monster.can_awaken === true && monster.obtainable === true,
      ),
    };

    return result;
  }
}

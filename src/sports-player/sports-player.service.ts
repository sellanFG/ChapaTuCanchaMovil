import { Injectable } from '@nestjs/common';
import { CreateSportsPlayerDto } from './dto/create-sports-player.dto';
import { UpdateSportsPlayerDto } from './dto/update-sports-player.dto';

@Injectable()
export class SportsPlayerService {
  create(createSportsPlayerDto: CreateSportsPlayerDto) {
    return 'This action adds a new sportsPlayer';
  }

  findAll() {
    return `This action returns all sportsPlayer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sportsPlayer`;
  }

  update(id: number, updateSportsPlayerDto: UpdateSportsPlayerDto) {
    return `This action updates a #${id} sportsPlayer`;
  }

  remove(id: number) {
    return `This action removes a #${id} sportsPlayer`;
  }
}

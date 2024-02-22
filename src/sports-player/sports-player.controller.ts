import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SportsPlayerService } from './sports-player.service';
import { CreateSportsPlayerDto } from './dto/create-sports-player.dto';
import { UpdateSportsPlayerDto } from './dto/update-sports-player.dto';

@Controller('sports-player')
export class SportsPlayerController {
  constructor(private readonly sportsPlayerService: SportsPlayerService) {}

  @Post()
  create(@Body() createSportsPlayerDto: CreateSportsPlayerDto) {
    return this.sportsPlayerService.create(createSportsPlayerDto);
  }

  @Get()
  findAll() {
    return this.sportsPlayerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportsPlayerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSportsPlayerDto: UpdateSportsPlayerDto) {
    return this.sportsPlayerService.update(+id, updateSportsPlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportsPlayerService.remove(+id);
  }
}

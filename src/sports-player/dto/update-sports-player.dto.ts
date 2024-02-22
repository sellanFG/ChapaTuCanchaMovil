import { PartialType } from '@nestjs/swagger';
import { CreateSportsPlayerDto } from './create-sports-player.dto';

export class UpdateSportsPlayerDto extends PartialType(CreateSportsPlayerDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from '.';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}

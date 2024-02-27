import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from '.';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

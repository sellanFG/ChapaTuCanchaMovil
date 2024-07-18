import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from '.';

export class UpdateTeamDto extends PartialType(
  OmitType(CreateTeamDto, [
    'registrationDate',
    'sportId',
    'playerId',
  ] as const),
) { }

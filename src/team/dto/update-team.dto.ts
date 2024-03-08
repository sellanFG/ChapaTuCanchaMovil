import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from '.';

export class UpdateTeamDto extends PartialType(
  OmitType(CreateTeamDto, [
    'teamRegistrationDate',
    'sportId',
    'playerId',
  ] as const),
) {}

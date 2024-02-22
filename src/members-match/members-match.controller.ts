import { Controller } from '@nestjs/common';
import { MembersMatchService } from './members-match.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('members-match')
@Controller('members-match')
export class MembersMatchController {
  constructor(private readonly membersMatchService: MembersMatchService) {}
}

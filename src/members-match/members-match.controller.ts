import { Controller } from '@nestjs/common';
import { MembersMatchService } from './members-match.service';

@Controller('members-match')
export class MembersMatchController {
  constructor(private readonly membersMatchService: MembersMatchService) {}
}

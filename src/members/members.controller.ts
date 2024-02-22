import { Controller } from '@nestjs/common';
import { MembersService } from './members.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
}

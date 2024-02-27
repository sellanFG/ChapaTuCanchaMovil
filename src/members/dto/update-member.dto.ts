import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from '.';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
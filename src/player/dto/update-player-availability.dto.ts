import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
export class UpdatePlayerAvailabilityDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  availability: boolean;
}

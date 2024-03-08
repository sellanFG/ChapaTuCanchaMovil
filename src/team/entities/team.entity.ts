import { ApiProperty } from '@nestjs/swagger';

export class TeamEntity {
  constructor(
    teamName: string,
    teamLogo: string,
    teamSearchStatus: string,
    sportId: number,
    teamRegistrationDate: Date,
  ) {
    this.teamName = teamName;
    this.teamLogo = teamLogo;
    this.teamSearchStatus = teamSearchStatus;
    this.sportId = sportId;
    this.teamRegistrationDate = teamRegistrationDate;
  }
  teamName: string;
  teamLogo: string;
  teamRegistrationDate: Date;
  teamSearchStatus: string;
  sportId: number;
}

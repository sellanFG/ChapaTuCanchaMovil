import { ApiProperty } from '@nestjs/swagger';

export class TeamEntity {
  constructor(
    teamName: string,
    teamLogo: string,
    teamSearchStatus: string,
    sportId: number,
    teamRegistrationDate: Date,
  ) {
    this.name = teamName;
    this.logo = teamLogo;
    this.searchStatus = teamSearchStatus;
    this.sportId = sportId;
    this.registrationDate = teamRegistrationDate;
  }
  name: string;
  logo: string;
  registrationDate: Date;
  searchStatus: string;
  sportId: number;
}

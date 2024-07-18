import { CreateMatchDto } from '../dto/create-match.dto';

export class MatchEntity {
  constructor(matchId: number, data: CreateMatchDto) {
    this.matchId = matchId;
    this.matchDate = data.date;
    this.matchTime = data.time;
    this.matchDistrict = data.district;
    this.matchRegistrationDate = data.registrationDate;
    this.stateField = data.stateField;
    this.sportId = data.sportId;
    this.gameModeId = data.gameModeId;
    this.sportFieldId = data.sportFieldId;
  }
  matchId: number;
  matchDate: Date;
  matchTime: Date;
  matchDistrict: string;
  matchRegistrationDate: Date;
  stateField: boolean;
  sportId: number;
  gameModeId: number;
  sportFieldId: number;
}

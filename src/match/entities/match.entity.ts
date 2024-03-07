import { CreateMatchDto } from '../dto/create-match.dto';

export class MatchEntity {
  constructor(matchId: number, data: CreateMatchDto) {
    this.matchId = matchId;
    this.matchDate = data.matchDate;
    this.matchTime = data.matchTime;
    this.matchDistrict = data.matchDistrict;
    this.matchRegistrationDate = data.matchRegistrationDate;
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

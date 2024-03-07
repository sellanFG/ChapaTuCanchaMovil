export class TeamMatchEntity {
  constructor(teamId: number, matchId: number) {
    this.teamId = teamId;
    this.matchId = matchId;
  }
  teamId: number;
  matchId: number;
  statusNFU: boolean;
  playerId: number;
}

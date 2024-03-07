export class MembersMatchEntity {
  constructor(playerId: number, teamId: number, matchId: number) {
    this.playerId = playerId;
    this.teamId = teamId;
    this.matchId = matchId;
  }

  playerId: number;
  teamId: number;
  matchId: number;
}

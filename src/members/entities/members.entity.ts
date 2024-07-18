export class MembersEntity {
  constructor(
    playerId: number,
    rol: string,
    registrationDate: Date,
    teamId?: number,
  ) {
    this.playerId = playerId;
    this.role = rol;
    this.registrationDate = registrationDate;
    this.teamId = teamId;
  }
  teamId: number;
  playerId: number;
  role: string;
  registrationDate: Date;
}

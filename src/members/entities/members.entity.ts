export class MembersEntity {
  constructor(
    playerId: number,
    rol: string,
    registrationDate: Date,
    teamId?: number,
  ) {
    this.playerId = playerId;
    this.memberRole = rol;
    this.memberRegistrationDate = registrationDate;
    this.teamId = teamId;
  }
  teamId: number;
  playerId: number;
  memberRole: string;
  memberRegistrationDate: Date;
}

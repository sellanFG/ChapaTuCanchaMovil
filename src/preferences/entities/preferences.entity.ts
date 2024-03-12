export class PreferencesEntity {
  constructor(answerId, playerId) {
    this.answerId = answerId;
    this.playerId = playerId;
  }

  answerId: number;
  playerId: number;
}

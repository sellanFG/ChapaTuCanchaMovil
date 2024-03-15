export class PreferencesEntity {
  constructor(answerId, playerId, sportId) {
    this.answerId = answerId;
    this.playerId = playerId;
    this.sportId = sportId;
  }

  answerId: number;
  playerId: number;
  sportId: number;
}

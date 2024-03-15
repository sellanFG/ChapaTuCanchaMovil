interface Sport {
  sportName: string;
  sportDescription: string;
  sportImage: string;
}

export class SportsPlayerEntity {
  sportId: number;
  playerId: number;
  Sport: Sport;
}

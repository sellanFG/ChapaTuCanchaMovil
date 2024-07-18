interface Sport {
  name: string;
  description: string;
  image: string;
}

export class SportsPlayerEntity {
  sportId: number;
  playerId: number;
  sport: Sport;
}

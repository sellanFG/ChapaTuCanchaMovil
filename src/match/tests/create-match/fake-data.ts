import { faker } from '@faker-js/faker';
import { PlayerEntity } from '../../../player/entities/player.entity';
import { PLUSDAYS } from '../../../utils/constants';
import { CreateMatchDto } from '../../dto/create-match.dto';
import { MatchEntity } from '../../entities/match.entity';

const players: PlayerEntity[] = [];

const matchId = 1;
const teamId1 = 10;
const teamId2 = 20;
const usersId1 = [];
const usersId2 = [];

for (let i = 0; i < 10; i++) {
  usersId1.push(faker.number.int());
  usersId2.push(faker.number.int());
}

for (const id of usersId1.concat(usersId2)) {
  const booleanRandom = Boolean(Math.round(Math.random()));
  players.push(
    new PlayerEntity(
      id,
      faker.internet.userName(),
      faker.internet.password(),
      faker.person.firstName(),
      faker.person.lastName(),
      faker.phone.number(),
      faker.internet.email(),
      faker.date.past(),
      faker.string.binary(),
      faker.person.sex(),
      faker.location.city(),
      faker.date.past(),
      booleanRandom,
      false,
      booleanRandom,
    ),
  );
}
export { players };
export const notSuscribedPlayers = players.filter((p) => !p.playerSubscription);

// CREATE matchDto
const matchDate = '2021-10-10';
const matchTime = '10:10:10';
const dateFull = new Date(matchDate + ' ' + matchTime);
export const matchDto = new CreateMatchDto(
  dateFull,
  dateFull,
  faker.location.city(),
  new Date(matchDate + '8:00:00'),
  false,
  100,
  200,
  300,
  teamId1,
  teamId2,
  usersId1,
  usersId2,
);
export const match = new MatchEntity(matchId, matchDto);

export const infoMatch = {
  matchId,
  matchDate: matchDto.date,
  matchTime: matchDto.time,
  matchDistrict: matchDto.district,
  Sport: {
    sportId: matchDto.sportId,
    sportName: faker.internet.userName(),
    sportImage: 'sss',
  },
  GameMode: {
    gameModeId: matchDto.gameModeId,
    gameModeName: '7vs7',
  },
};
export const teams = [
  {
    teamId: teamId1,
    teamName: faker.company.name(),
    teamLogo: 'sss',
  },
  {
    teamId: teamId2,
    teamName: faker.company.name(),
    teamLogo: 'sss',
  },
];

const playersNotSubscribIds = notSuscribedPlayers.map((p) => p.playerId);

export const matchEntityPost = {
  infoMatch,
  teams,
  playersNotSubscribIds: [],
  endTime: null,
};
export const matchEntityPostWithEndTime = {
  infoMatch,
  teams,
  playersNotSubscribIds,
  endTime: new Date(dateFull.setDate(dateFull.getDate() + PLUSDAYS)),
};
export const getLastDateUserMatch = {
  playerId: playersNotSubscribIds[0],
  Match: {
    matchDate: matchDate,
    matchTime: matchTime,
  },
};

export const playersAllSuscribed = structuredClone(players).map((p) => {
  p.playerSubscription = true;
  return p;
});

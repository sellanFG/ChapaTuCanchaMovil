import { Test } from '@nestjs/testing';
import { MembersMatchService } from '../../../members-match/members-match.service';
import { PlayerService } from '../../../player/player.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { TeamMatchService } from '../../../team-match/team-match.service';
import { MatchService } from '../../match.service';
import {
  getLastDateUserMatch,
  infoMatch,
  match,
  matchDto,
  matchEntityPost,
  matchEntityPostWithEndTime,
  notSuscribedPlayers,
  players,
  playersAllSuscribed,
  teams,
} from './fake-data';

describe('transaction match', () => {
  let matchService: MatchService;
  let createMatch: jest.Mock;
  let createManyTeamMatch: jest.Mock;
  let createManyMembersMatch: jest.Mock;
  let updateManyPlayer: jest.Mock;
  let findManyTeamMatch: jest.Mock;
  let findUniqueMatch: jest.Mock;
  let findFirstMembersMatch: jest.Mock;
  let findManyPlayer: jest.Mock;
  let transaction: jest.Mock;

  beforeEach(async () => {
    createMatch = jest.fn();
    createManyTeamMatch = jest.fn();
    createManyMembersMatch = jest.fn();
    updateManyPlayer = jest.fn();
    findManyTeamMatch = jest.fn();
    findUniqueMatch = jest.fn();
    findFirstMembersMatch = jest.fn();
    findManyPlayer = jest.fn();
    transaction = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        MatchService,
        TeamMatchService,
        PlayerService,
        MembersMatchService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn().mockImplementation((callback) =>
              callback({
                match: {
                  create: createMatch,
                },
                teamMatch: {
                  createMany: createManyTeamMatch,
                },
                membersMatch: {
                  createMany: createManyMembersMatch,
                },
                player: {
                  updateMany: updateManyPlayer,
                },
              }),
            ),
            match: {
              findUnique: findUniqueMatch,
            },
            teamMatch: {
              findMany: findManyTeamMatch,
            },
            membersMatch: {
              findFirst: findFirstMembersMatch,
            },
            player: {
              findMany: findManyPlayer,
            },
          },
        },
      ],
    }).compile();
    matchService = module.get<MatchService>(MatchService);
  });

  describe('when the create method is called', () => {
    describe('and the createMatch is successful', () => {
      beforeEach(() => {
        createMatch.mockResolvedValue(match);
      });

      describe('and the createManyTeamMatch is successful', () => {
        beforeEach(() => {
          createManyTeamMatch.mockResolvedValue({
            count: 2,
          });
        });
        describe('and the createManyMembersMatch is successful', () => {
          beforeEach(() => {
            createManyMembersMatch.mockResolvedValue({
              count: 20,
            });
          });
          describe('and the updateManyPlayer is successful', () => {
            describe('and getMatchResponseModel is successful', () => {
              beforeEach(() => {
                findFirstMembersMatch.mockResolvedValue(getLastDateUserMatch);
                findUniqueMatch.mockResolvedValue(infoMatch);
                findManyTeamMatch.mockResolvedValue(teams);
                findFirstMembersMatch.mockResolvedValue(getLastDateUserMatch);
              });
              describe('if playersNotSuscribed is not empty', () => {
                beforeEach(() => {
                  findManyPlayer.mockResolvedValue(players);
                  updateManyPlayer.mockResolvedValue({
                    count: notSuscribedPlayers.length,
                  });
                });

                it('should return the model match', async () => {
                  const result = await matchService.create(matchDto);
                  expect(result).toEqual(matchEntityPostWithEndTime);
                });
              });
              describe('if playersNotSuscribed is empty', () => {
                beforeEach(() => {
                  findManyPlayer.mockResolvedValue(playersAllSuscribed);
                  updateManyPlayer.mockResolvedValue({
                    count: 0,
                  });
                });

                it('should return the model match', async () => {
                  const result = await matchService.create(matchDto);
                  expect(result).toEqual(matchEntityPost);
                });
              });
            });
          });

          describe('and the updateManyPlayer is unsuccessful', () => {
            beforeEach(() => {
              findManyPlayer.mockResolvedValue(players);
              updateManyPlayer.mockResolvedValue({
                count: notSuscribedPlayers.length - 1,
              });
            });
            it('should throw the Error', async () => {
              return expect(async () => {
                await matchService.create(matchDto);
              }).rejects.toThrow(Error);
            });
          });
        });

        describe('and the createManyMembersMatch is unsuccessful', () => {
          beforeEach(() => {
            createManyMembersMatch.mockResolvedValue({
              count: 10,
            });
          });

          it('should throw the Error', async () => {
            return expect(async () => {
              await matchService.create(matchDto);
            }).rejects.toThrow(Error);
          });
        });
      });
      describe('and the createManyTeamMatch is unsuccessful', () => {
        beforeEach(() => {
          createManyTeamMatch.mockResolvedValue({
            count: 1,
          });
        });

        it('should throw the Error', async () => {
          return expect(async () => {
            await matchService.create(matchDto);
          }).rejects.toThrow(Error);
        });
      });
    });
  });
});

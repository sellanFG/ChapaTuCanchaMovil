import { Injectable, NotFoundException } from '@nestjs/common';
import { MembersMatchEntity } from '../members-match/entities/members-match.entity';
import { MembersMatchService } from '../members-match/members-match.service';
import { PlayerService } from '../player/player.service';
import { PrismaService } from '../prisma/prisma.service';
import { TeamMatchEntity } from '../team-match/entities/team-match.entity';
import { TeamMatchService } from '../team-match/team-match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { GetMatch } from './entities/swagger/getMatch.entity';
import { PostMatch } from './entities/swagger/postMatch.entity';

@Injectable()
export class MatchService {
  constructor(
    private prisma: PrismaService,
    private teamMatchService: TeamMatchService,
    private playerService: PlayerService,
    private memberMatchService: MembersMatchService,
  ) { }

  getMatches(): Promise<GetMatch[]> {
    return this.prisma.handleDbOperation(
      this.prisma.match.findMany({
        select: {
          matchId: true,
          date: true,
          time: true,
          district: true,
          registrationDate: true,
          stateField: true,
          sport: {
            select: {
              sportId: true,
              image: true,
              name: true,
            },
          },
          gameMode: {
            select: {
              gameModeId: true,
              name: true,
            },
          },
          sportField: {
            select: {
              sportFieldId: true,
              name: true,
            },
          },
        },
      }),
    );
  }

  async getMatchById(id: number): Promise<GetMatch> {
    const match = await this.prisma.handleDbOperation(
      this.prisma.match.findUnique({
        where: {
          matchId: id,
        },
        select: {
          matchId: true,
          date: true,
          time: true,
          district: true,
          registrationDate: true,
          stateField: true,
          sport: {
            select: {
              sportId: true,
              image: true,
              name: true,
            },
          },
          gameMode: {
            select: {
              gameModeId: true,
              name: true,
            },
          },
          sportField: {
            select: {
              sportFieldId: true,
              name: true,
            },
          },
        },
      }),
    );
    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }
    return match;
  }

  //Interactive transaction
  async create(data: CreateMatchDto): Promise<PostMatch> {
    try {
      const { teamId1, teamId2, usersId1, usersId2 } = data;
      const playersId = usersId1.concat(usersId2);

      return this.prisma.$transaction(async (tx) => {
        const match = await tx.match.create({
          data,
        });
        const matchId = match.matchId;

        //Create team match
        const teamsMatch = await this.createTeamsMatch(
          teamId1,
          teamId2,
          matchId,
        );
        const createTeamMatch = await tx.teamMatch.createMany({
          data: teamsMatch,
        });

        if (createTeamMatch.count != 2) {
          throw new Error('Error creating team match');
        }

        //Create members match
        const membersMatch = await this.createMembersMatch(
          teamId1,
          teamId2,
          usersId1,
          usersId2,
          matchId,
        );

        const createMembersMatch = await tx.matchMember.createMany({
          data: membersMatch,
        });

        if (createMembersMatch.count != membersMatch.length) {
          throw new Error('Error creating members match');
        }

        //update availability if the player is not subscribed
        const playersNotSubscribIds = await this.playersNotSubscrib(playersId);
        const updateAvailability = await tx.player.updateMany({
          where: {
            playerId: {
              in: playersNotSubscribIds,
            },
          },
          data: {
            availability: false,
          },
        });
        if (updateAvailability.count != playersNotSubscribIds.length) {
          throw new Error('Error updating availability');
        }

        return this.getMatchResponseModel(matchId, playersNotSubscribIds);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  private async createTeamsMatch(
    teamId1: number,
    teamId2: number,
    matchId: number,
  ) {
    const teamsMatch: TeamMatchEntity[] = [];
    teamsMatch.push(new TeamMatchEntity(teamId1, matchId));
    teamsMatch.push(new TeamMatchEntity(teamId2, matchId));

    return teamsMatch;
  }

  private async createMembersMatch(
    teamId1: number,
    teamId2: number,
    usersId1: number[],
    usersId2: number[],
    matchId: number,
  ) {
    const membersMatch: MembersMatchEntity[] = [];
    for (const user of usersId1) {
      membersMatch.push(new MembersMatchEntity(user, teamId1, matchId));
    }
    for (const user of usersId2) {
      membersMatch.push(new MembersMatchEntity(user, teamId2, matchId));
    }
    return membersMatch;
  }

  private async getMatchResponseModel(
    matchId: number,
    playersNotSubscribIds: number[],
  ) {
    const infoMatch = await this.getInfoMatchById(matchId);
    const teams = await this.teamMatchService.getAllTeamMatchByMatchId(matchId);

    if (playersNotSubscribIds.length == 0) {
      return { infoMatch, teams, playersNotSubscribIds, endTime: null };
    }
    const endTime = await this.memberMatchService.getEndTimeA(
      playersNotSubscribIds[0],
    );
    return { infoMatch, teams, playersNotSubscribIds, endTime };
  }

  private async playersNotSubscrib(usersId: number[]): Promise<number[]> {
    const playersInfo = await this.playerService.getAllPlayerInfo(usersId);

    return playersInfo
      .filter((p) => !p.subscription)
      .map((p) => p.playerId);
  }

  private getInfoMatchById(matchId: number) {
    return this.prisma.match.findUnique({
      where: {
        matchId,
      },
      select: {
        matchId: true,
        date: true,
        time: true,
        district: true,
        sport: {
          select: {
            sportId: true,
            name: true,
            image: true,
          },
        },
        gameMode: {
          select: {
            gameModeId: true,
            name: true,
          },
        },
      },
    });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Members } from '@prisma/client';
import { PlayerService } from 'src/player/player.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamService } from 'src/team/team.service';
import { CreateMemberDto, UpdateMemberDto } from './dto';

@Injectable()
export class MembersService {
  constructor(
    private prisma: PrismaService,
    private player: PlayerService,
    private team: TeamService,
  ) {}

  async getMembersByTeam(teamId: number): Promise<Members[]> {
    return this.prisma.handleDbOperation(
      this.prisma.members.findMany({
        where: {
          teamId: teamId,
        },
      }),
    );
  }

  async getMemberInfo(playerId: number, teamId: number): Promise<any> {
    // const player = await this.player.getPlayerInfo(playerId);
    return this.prisma.handleDbOperation(
      this.prisma.members.findUnique({
        where: {
          playerId_teamId: {
            playerId: playerId,
            teamId: teamId,
          },
        },
        select: {
          Player: true,
          memberRole: true,
          memberRegistrationDate: true,
        },
      }),
    );
  }

  async CreateMember(data: CreateMemberDto): Promise<any> {
    await this.player.getPlayerById(data.playerId);
    await this.team.getTeamById(data.teamId);
    return this.prisma.handleDbOperation(
      this.prisma.members.create({
        data,
      }),
    );
  }

  async updateMemberRole(
    capId: number,
    playerId: number,
    teamId: number,
    role: string,
  ): Promise<UpdateMemberDto> {
    const cap = 'C';
    const SubCap = 'S';
    const player = 'P';
    if (this.validateRole(capId, teamId)) {
      if (role === cap) {
        this.prisma.handleDbOperation(
          this.prisma.members.update({
            where: {
              playerId_teamId: {
                playerId: playerId,
                teamId: teamId,
              },
            },
            data: {
              memberRole: role,
            },
          }),
        );
        return this.prisma.handleDbOperation(
          this.prisma.members.update({
            where: {
              playerId_teamId: {
                playerId: capId,
                teamId: teamId,
              },
            },
            data: {
              memberRole: player,
            },
          }),
        );
      } else if (role === SubCap) {
        return this.prisma.handleDbOperation(
          this.prisma.members.update({
            where: {
              playerId_teamId: {
                playerId: playerId,
                teamId: teamId,
              },
            },
            data: {
              memberRole: role,
            },
          }),
        );
      }
    } else {
      throw new BadRequestException(
        `You don't have the necessary permissions to perform this action`,
      );
    }
  }

  async updateMemberStatus(
    playerId: number,
    teamId: number,
    status: boolean,
  ): Promise<UpdateMemberDto> {
    return this.prisma.handleDbOperation(
      this.prisma.members.update({
        where: {
          playerId_teamId: {
            playerId: playerId,
            teamId: teamId,
          },
        },
        data: {
          memberStatus: status,
        },
      }),
    );
  }

  async deleteMember(playerId: number, teamId: number): Promise<any> {
    return this.prisma.handleDbOperation(
      this.prisma.members.delete({
        where: {
          playerId_teamId: {
            playerId: playerId,
            teamId: teamId,
          },
        },
      }),
    );
  }

  async validateRole(playerId: number, teamId: number): Promise<boolean> {
    const role = await this.prisma.members.findUnique({
      where: {
        playerId_teamId: {
          playerId: playerId,
          teamId: teamId,
        },
      },
      select: {
        memberRole: true,
      },
    });

    if (role.memberRole === 'C') {
      return true;
    } else {
      return false;
    }
  }
}

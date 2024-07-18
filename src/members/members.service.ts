import { BadRequestException, Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
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
  ) { }

  async getMembersByTeam(teamId: number): Promise<Member[]> {
    return this.prisma.handleDbOperation(
      this.prisma.member.findMany({
        where: {
          teamId: teamId,
        },
      }),
    );
  }

  async getMemberInfo(playerId: number, teamId: number): Promise<any> {
    // const player = await this.player.getPlayerInfo(playerId);
    return this.prisma.handleDbOperation(
      this.prisma.member.findUnique({
        where: {
          playerId_teamId: {
            playerId: playerId,
            teamId: teamId,
          },
        },
        select: {
          player: true,
          role: true,
          registrationDate: true,
        },
      }),
    );
  }

  async CreateMember(data: CreateMemberDto): Promise<any> {
    await this.player.getPlayerById(data.playerId);
    await this.team.getTeamById(data.teamId);
    return this.prisma.handleDbOperation(
      this.prisma.member.create({
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
          this.prisma.member.update({
            where: {
              playerId_teamId: {
                playerId: playerId,
                teamId: teamId,
              },
            },
            data: {
              role: role,
            },
          }),
        );
        return this.prisma.handleDbOperation(
          this.prisma.member.update({
            where: {
              playerId_teamId: {
                playerId: capId,
                teamId: teamId,
              },
            },
            data: {
              role: player,
            },
          }),
        );
      } else if (role === SubCap) {
        return this.prisma.handleDbOperation(
          this.prisma.member.update({
            where: {
              playerId_teamId: {
                playerId: playerId,
                teamId: teamId,
              },
            },
            data: {
              role: role,
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
      this.prisma.member.update({
        where: {
          playerId_teamId: {
            playerId: playerId,
            teamId: teamId,
          },
        },
        data: {
          status: status,
        },
      }),
    );
  }

  async deleteMember(playerId: number, teamId: number): Promise<any> {
    return this.prisma.handleDbOperation(
      this.prisma.member.delete({
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
    const role = await this.prisma.member.findUnique({
      where: {
        playerId_teamId: {
          playerId: playerId,
          teamId: teamId,
        },
      },
      select: {
        role: true,
      },
    });

    if (role.role === 'C') {
      return true;
    } else {
      return false;
    }
  }
}

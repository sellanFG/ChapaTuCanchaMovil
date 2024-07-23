import { AuthDto } from '@/auth/dto/Auth.dto';
import { PlayerService } from '@/player/player.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Player } from '@prisma/client';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    private readonly types: any;
    constructor(private playerService: PlayerService, private jwtService: JwtService) {
        this.types = {
            1: (data: string) => this.playerService.getPlayerByPhoneNumber(data),
            2: (data: string) => this.playerService.getPlayerByEmail(data),
        }
    }

    getTypes() {
        return this.types;
    }

    async signIn(type: number, data: AuthDto): Promise<{ access_token: string }> {
        const player: Player = await this.types[type](data.username);
        const { password } = player
        if (!await bcrypt.compare(data.password, password)) {
            throw new BadRequestException('Invalid password')
        }

        const paylod = { sub: player.playerId, username: player.userName };

        return {
            access_token: await this.jwtService.signAsync(paylod),
        }
    }
}

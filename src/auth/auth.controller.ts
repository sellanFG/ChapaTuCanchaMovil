import { AuthService } from '@/auth/auth.service';
import { Public } from '@/auth/constants';
import { AuthDto } from '@/auth/dto/Auth.dto';
import { BadRequestException, Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(200)
    @Public()
    @Post('login')
    async signIn(@Query('type') type: number, @Body() data: AuthDto): Promise<{ access_token: string }> {
        if (!this.authService.getTypes()[type]) {
            throw new BadRequestException('Invalid type');
        }
        return await this.authService.signIn(type, data)
    }
}
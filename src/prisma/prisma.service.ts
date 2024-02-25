import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async handleDbOperation(operation: Promise<any>): Promise<any> {
    try {
      return await operation;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

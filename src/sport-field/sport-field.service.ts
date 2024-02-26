import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { sportField } from './entities/sport-field.entity';

@Injectable()
export class SportFieldService {

    constructor(private prisma: PrismaService) {}

    async getSportFields(): Promise<sportField[]>{
        const sportFields = await this.prisma.handleDbOperation(
            this.prisma.sportField.findMany(),
        );
        return sportFields;
    }

    async getSportFieldById(id: number): Promise<sportField>{
        const sportField = await this.prisma.handleDbOperation(
            this.prisma.sportField.findUnique({
                where: {
                    sportFieldId: id,
                },
            }),
        );

        if (!sportField) {
            throw new NotFoundException(`SportField with id ${id} not found`);
        }
        return sportField;
    }
}

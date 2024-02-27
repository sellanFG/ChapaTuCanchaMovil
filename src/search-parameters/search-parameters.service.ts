import { Injectable } from '@nestjs/common';
import { CreateSearchParameterDto } from './dto/create-search-parameter.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SearchParameters } from '@prisma/client';

@Injectable()
export class SearchParametersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateSearchParameterDto): Promise<SearchParameters> {
    return this.prisma.handleDbOperation(
      this.prisma.searchParameters.create({
        data,
      }),
    );
  }

  delete(id: number): Promise<SearchParameters> {
    return this.prisma.handleDbOperation(
      this.prisma.searchParameters.delete({
        where: {
          searchParametersId: id,
        },
      }),
    );
  }
}

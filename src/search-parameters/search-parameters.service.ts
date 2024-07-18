import { Injectable } from '@nestjs/common';
import { SearchParameter } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSearchParameterDto } from './dto/create-search-parameter.dto';

@Injectable()
export class SearchParametersService {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateSearchParameterDto): Promise<SearchParameter> {
    return null
    // return this.prisma.handleDbOperation(
    //   this.prisma.searchParameters.create({
    //     data,
    //   }),
    // );
  }

  delete(id: number): Promise<SearchParameter> {
    return this.prisma.handleDbOperation(
      this.prisma.searchParameter.delete({
        where: {
          searchParameterId: id,
        },
      }),
    );
  }
}

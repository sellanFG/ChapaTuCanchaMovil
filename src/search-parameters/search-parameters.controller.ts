import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { SearchParametersService } from './search-parameters.service';
import { CreateSearchParameterDto } from './dto/create-search-parameter.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SearchParameters } from '@prisma/client';
import { SearchParametersEntity } from './entities/search-parameter.entity';

@ApiTags('search-parameters')
@Controller('search-parameters')
export class SearchParametersController {
  constructor(
    private readonly searchParametersService: SearchParametersService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: SearchParametersEntity })
  create(
    @Body() createSearchParameterDto: CreateSearchParameterDto,
  ): Promise<SearchParameters> {
    return this.searchParametersService.create(createSearchParameterDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: SearchParametersEntity })
  delete(@Param('id') id: number): Promise<SearchParameters> {
    return this.searchParametersService.delete(id);
  }
}

import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SearchParameter } from '@prisma/client';
import { CreateSearchParameterDto } from './dto/create-search-parameter.dto';
import { SearchParametersEntity } from './entities/search-parameter.entity';
import { SearchParametersService } from './search-parameters.service';

@ApiTags('search-parameters')
@Controller('search-parameters')
export class SearchParametersController {
  constructor(
    private readonly searchParametersService: SearchParametersService,
  ) { }

  @Post()
  @ApiCreatedResponse({ type: SearchParametersEntity })
  create(
    @Body() createSearchParameterDto: CreateSearchParameterDto,
  ): Promise<SearchParameter> {
    return this.searchParametersService.create(createSearchParameterDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: SearchParametersEntity })
  delete(@Param('id') id: number): Promise<SearchParameter> {
    return this.searchParametersService.delete(id);
  }
}

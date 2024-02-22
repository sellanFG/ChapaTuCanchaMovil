import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchParametersService } from './search-parameters.service';
import { CreateSearchParameterDto } from './dto/create-search-parameter.dto';
import { UpdateSearchParameterDto } from './dto/update-search-parameter.dto';

@Controller('search-parameters')
export class SearchParametersController {
  constructor(private readonly searchParametersService: SearchParametersService) {}

  @Post()
  create(@Body() createSearchParameterDto: CreateSearchParameterDto) {
    return this.searchParametersService.create(createSearchParameterDto);
  }

  @Get()
  findAll() {
    return this.searchParametersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchParametersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchParameterDto: UpdateSearchParameterDto) {
    return this.searchParametersService.update(+id, updateSearchParameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchParametersService.remove(+id);
  }
}

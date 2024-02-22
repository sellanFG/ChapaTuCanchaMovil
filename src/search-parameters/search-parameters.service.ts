import { Injectable } from '@nestjs/common';
import { CreateSearchParameterDto } from './dto/create-search-parameter.dto';
import { UpdateSearchParameterDto } from './dto/update-search-parameter.dto';

@Injectable()
export class SearchParametersService {
  create(createSearchParameterDto: CreateSearchParameterDto) {
    return 'This action adds a new searchParameter';
  }

  findAll() {
    return `This action returns all searchParameters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} searchParameter`;
  }

  update(id: number, updateSearchParameterDto: UpdateSearchParameterDto) {
    return `This action updates a #${id} searchParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} searchParameter`;
  }
}

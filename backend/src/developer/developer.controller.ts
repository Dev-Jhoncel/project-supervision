import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import CUSTOM_RESPONSE from 'src/response/custom-response/CustomResponse';

@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post()
  @Version('1')
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developerService.create(createDeveloperDto);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.developerService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.developerService.findOne(+id);
  }

  @Patch(':id')
  @Version('1')
  update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developerService.update(+id, updateDeveloperDto);
  }

  @Get('top-developers/:id')
  @Version('1')
  async findTopDeveloper(
    @Param('id') id: number,
    @Query('skips') skips: number,
    @Query('takes') takes: number,
  ) {
    try {
      console.log(`User ${id} accessed top developers`);
      const response = await this.developerService.findTopDevelopers(
        skips,
        takes,
      );
      console.log(response);
      return CUSTOM_RESPONSE.getCustomResponse(
        HttpStatus.OK,
        'Success',
        response,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('available-dev/:id')
  @Version('1')
  async findAvailableDevelopers(
    @Param('id') id: number,
    @Query('skips') skips: number,
    @Query('takes') takes: number,
  ) {
    try {
      console.log(`User ${id} accessed top developers`);
      const response = await this.developerService.findAvailableDevelopers(
        skips,
        takes,
      );
      console.log(response);
      return CUSTOM_RESPONSE.getCustomResponse(
        HttpStatus.OK,
        'Success',
        response,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.developerService.remove(+id);
  }
}

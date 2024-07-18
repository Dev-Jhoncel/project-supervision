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
  Put,
} from '@nestjs/common';
import CUSTOM_RESPONSE from 'src/response/custom-response/CustomResponse';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Version('1')
  async create(@Body() createProjectDto: CreateProjectDto) {
    try {
      const response = await this.projectsService.create(createProjectDto);
      return CUSTOM_RESPONSE.getCustomResponse(
        HttpStatus.OK,
        'Success',
        response,
      );
    } catch (error) {
      //Unpredicted Error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('active-projects/:id')
  @Version('1')
  async findAll(@Param('id') id: number[]) {
    try {
      const response = await this.projectsService.findAll(+id);
      return CUSTOM_RESPONSE.getCustomResponse(
        HttpStatus.OK,
        'Success',
        response,
      );
    } catch (error) {
      //Unpredicted Error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @Version('1')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.projectsService.findOne(+id);
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

  @Patch(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    try {
      const response = this.projectsService.update(+id, updateProjectDto);
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
    try {
      const response = this.projectsService.remove(+id);
      return CUSTOM_RESPONSE.getCustomResponse(
        HttpStatus.OK,
        'Success',
        response,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @Version('1')
  updateStatus(
    @Param('id') id: string,
    @Body() updateProjectDto: CreateProjectDto,
  ) {
    try {
      const response = this.projectsService.updateStatus(+id, updateProjectDto);
      return CUSTOM_RESPONSE.getCustomResponse(
        HttpStatus.OK,
        'Success',
        response,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

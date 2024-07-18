import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  HttpStatus,
  HttpException,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import CUSTOM_RESPONSE from 'src/response/custom-response/CustomResponse';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Version('1')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('all-tasks/:id')
  @Version('1')
  async findAll(@Param('id') id: number) {
    try {
      const response = await this.taskService.findAll(+id);
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
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Get('developer-task/:id')
  @Version('1')
  findOneWithTask(@Param('id') id: string) {
    return this.taskService.findOneWithTask(+id);
  }

  @Patch(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Put(':id')
  @Version('1')
  put(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.put(+id, updateTaskDto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}

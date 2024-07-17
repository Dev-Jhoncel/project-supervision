import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Version('1')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.taskService.findAll();
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

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}

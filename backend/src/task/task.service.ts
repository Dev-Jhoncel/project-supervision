import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);
    return this.prisma.task.create({ data: createTaskDto });
  }

  async findAll(id: number) {
    return this.prisma.task.findMany({ where: { user_id: id } });
  }

  async findOne(id: number) {
    return await this.prisma.task.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return await this.prisma.$transaction(async (transaction) => {
      return await transaction.task.update({
        where: { id: id },
        data: updateTaskDto,
      });
    });
  }

  async put(id: number, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return await this.prisma.$transaction(async (transaction) => {
      return await transaction.task.update({
        where: { id: id },
        data: updateTaskDto,
      });
    });
  }

  async findOneWithTask(id: number) {
    return await this.prisma.task.findMany({
      where: { developerId: id },
      include: { developer: true },
    });
  }

  async remove(id: number) {
    return await this.prisma.task.delete({
      where: { id: id },
    });
  }
}

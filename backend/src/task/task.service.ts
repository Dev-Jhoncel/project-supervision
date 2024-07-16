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

  async findAll() {
    return this.prisma.task.findMany();
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

  async remove(id: number) {
    return await this.prisma.task.delete({
      where: { id: id },
    });
  }
}

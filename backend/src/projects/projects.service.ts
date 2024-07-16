import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    console.log(createProjectDto);
    return await this.prisma.projects.create({ data: createProjectDto });
  }

  async findAll(id: number) {
    console.log(`Im inside findAll ${id}`);
    return await this.prisma.projects.findMany({ where: { user_id: id } });
  }

  async findOne(id: number) {
    return await this.prisma.projects.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    console.log(updateProjectDto);
    try {
      return await this.prisma.projects.update({
        where: { id: id },
        data: updateProjectDto,
      });
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  async remove(id: number) {
    return await this.prisma.projects.delete({
      where: { id: id },
    });
  }

  async updateStatus(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.prisma.projects.update({
      where: { id: id },
      data: updateProjectDto,
    });
  }
}

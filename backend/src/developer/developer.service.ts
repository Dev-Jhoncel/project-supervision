import { Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeveloperService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDeveloperDto: CreateDeveloperDto) {
    console.log(createDeveloperDto);
    return this.prisma.developer.create({
      data: {
        first_name: createDeveloperDto.first_name,
        middle_name: createDeveloperDto.middle_name,
        last_name: createDeveloperDto.last_name,
        suffix: createDeveloperDto.suffix,
        email: createDeveloperDto.email,
        mobile_no: createDeveloperDto.mobile_no,
        role: createDeveloperDto.role,
        isActive: createDeveloperDto.isActive,
      },
    });
  }

  findAll() {
    return this.prisma.developer.findMany({ where: { isActive: 1 } });
  }

  findTopDevelopers(skips: number, takes: number) {
    return this.prisma.developer.findMany({
      where: { isActive: 1 },
      skip: +skips,
      take: +takes,
      orderBy: {
        points: 'desc',
      },
      include: {
        tech_stack: true,
        task: {
          select: { projectId: true },
          distinct: ['projectId'],
        },
      },
    });
  }

  findAvailableDevelopers(skips: number, takes: number) {
    return this.prisma.developer.findMany({
      where: { isAvailable: 1, isActive: 1 },
      skip: +skips,
      take: +takes,
      orderBy: {
        points: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.developer.findUnique({
      where: { id: id },
      include: { tech_stack: true },
    });
  }

  update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    console.log(updateDeveloperDto);
    return this.prisma.developer.update({
      where: { id: id },
      data: updateDeveloperDto,
    });
  }

  remove(id: number) {
    return this.prisma.developer.delete({ where: { id: id } });
  }
}

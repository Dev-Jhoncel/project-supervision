import { Injectable } from '@nestjs/common';
import { CreateTechStackDto } from './dto/create-tech_stack.dto';
import { UpdateTechStackDto } from './dto/update-tech_stack.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TechStackService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTechStackDto: CreateTechStackDto) {
    return this.prisma.tech_stack.create({ data: createTechStackDto });
  }

  findAll() {
    return this.prisma.tech_stack.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} techStack`;
  }

  update(id: number, updateTechStackDto: UpdateTechStackDto) {
    return this.prisma.developer.update({
      where: { id: id },
      data: updateTechStackDto,
    });
  }

  remove(id: number) {
    return this.prisma.tech_stack.delete({ where: { id: id } });
  }
}

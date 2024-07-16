import { Injectable } from '@nestjs/common';
import { CreateSkillSetDto } from './dto/create-skill_set.dto';
import { UpdateSkillSetDto } from './dto/update-skill_set.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkillSetsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSkillSetDto: CreateSkillSetDto) {
    return this.prisma.skill_sets.create({ data: createSkillSetDto });
  }

  findAll() {
    return this.prisma.skill_sets.findMany();
  }

  findOne(id: number) {
    return this.prisma.skill_sets.findUnique({ where: { id: id } });
  }

  update(id: number, updateSkillSetDto: UpdateSkillSetDto) {
    return this.prisma.skill_sets.update({
      where: { id: id },
      data: updateSkillSetDto,
    });
  }

  remove(id: number) {
    return this.prisma.skill_sets.delete({ where: { id: id } });
  }
}

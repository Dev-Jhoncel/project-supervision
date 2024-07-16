import { Injectable } from '@nestjs/common';
import { CreateGroupingDto } from './dto/create-grouping.dto';
import { UpdateGroupingDto } from './dto/update-grouping.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupingsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createGroupingDto: CreateGroupingDto) {
    return this.prisma.groupings.create({ data: createGroupingDto });
  }

  findAll() {
    return this.prisma.groupings.findMany();
  }

  findOne(id: number) {
    return this.prisma.groupings.findUnique({ where: { id: id } });
  }

  update(id: number, updateGroupingDto: UpdateGroupingDto) {
    return this.prisma.groupings.update({
      where: { id: id },
      data: updateGroupingDto,
    });
  }

  remove(id: number) {
    return this.prisma.groupings.delete({ where: { id: id } });
  }
}

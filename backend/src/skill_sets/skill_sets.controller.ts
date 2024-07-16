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
import { SkillSetsService } from './skill_sets.service';
import { CreateSkillSetDto } from './dto/create-skill_set.dto';
import { UpdateSkillSetDto } from './dto/update-skill_set.dto';

@Controller('skill-sets')
export class SkillSetsController {
  constructor(private readonly skillSetsService: SkillSetsService) {}

  @Post()
  @Version('1')
  create(@Body() createSkillSetDto: CreateSkillSetDto) {
    return this.skillSetsService.create(createSkillSetDto);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.skillSetsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.skillSetsService.findOne(+id);
  }

  @Patch(':id')
  @Version('1')
  update(
    @Param('id') id: string,
    @Body() updateSkillSetDto: UpdateSkillSetDto,
  ) {
    return this.skillSetsService.update(+id, updateSkillSetDto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.skillSetsService.remove(+id);
  }
}

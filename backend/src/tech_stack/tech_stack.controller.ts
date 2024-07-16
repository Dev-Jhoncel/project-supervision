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
import { TechStackService } from './tech_stack.service';
import { CreateTechStackDto } from './dto/create-tech_stack.dto';
import { UpdateTechStackDto } from './dto/update-tech_stack.dto';

@Controller('tech-stack')
export class TechStackController {
  constructor(private readonly techStackService: TechStackService) {}

  @Post()
  @Version('1')
  create(@Body() createTechStackDto: CreateTechStackDto) {
    return this.techStackService.create(createTechStackDto);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.techStackService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.techStackService.findOne(+id);
  }

  @Patch(':id')
  @Version('1')
  update(
    @Param('id') id: string,
    @Body() updateTechStackDto: UpdateTechStackDto,
  ) {
    return this.techStackService.update(+id, updateTechStackDto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id') id: string) {
    return this.techStackService.remove(+id);
  }
}

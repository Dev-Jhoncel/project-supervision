import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupingsService } from './groupings.service';
import { CreateGroupingDto } from './dto/create-grouping.dto';
import { UpdateGroupingDto } from './dto/update-grouping.dto';

@Controller('groupings')
export class GroupingsController {
  constructor(private readonly groupingsService: GroupingsService) {}

  @Post()
  create(@Body() createGroupingDto: CreateGroupingDto) {
    return this.groupingsService.create(createGroupingDto);
  }

  @Get()
  findAll() {
    return this.groupingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupingDto: UpdateGroupingDto,
  ) {
    return this.groupingsService.update(+id, updateGroupingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupingsService.remove(+id);
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillSetDto } from './create-skill_set.dto';

export class UpdateSkillSetDto extends PartialType(CreateSkillSetDto) {}

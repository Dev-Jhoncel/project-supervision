import { Module } from '@nestjs/common';
import { SkillSetsService } from './skill_sets.service';
import { SkillSetsController } from './skill_sets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SkillSetsController],
  providers: [SkillSetsService],
})
export class SkillSetsModule {}

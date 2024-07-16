import { Module } from '@nestjs/common';
import { TechStackService } from './tech_stack.service';
import { TechStackController } from './tech_stack.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TechStackController],
  providers: [TechStackService],
})
export class TechStackModule {}

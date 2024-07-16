import { Module } from '@nestjs/common';
import { GroupingsService } from './groupings.service';
import { GroupingsController } from './groupings.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GroupingsController],
  providers: [GroupingsService],
})
export class GroupingsModule {}

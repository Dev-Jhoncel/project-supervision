import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/provider/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/module/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectsModule } from './projects/projects.module';
import { TaskModule } from './task/task.module';
import { DeveloperModule } from './developer/developer.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProjectsModule,
    TaskModule,
    DeveloperModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}

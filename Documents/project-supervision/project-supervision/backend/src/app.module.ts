import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/provider/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/module/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}

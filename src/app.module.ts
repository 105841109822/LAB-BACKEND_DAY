import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from './profile/profile.module';
import { PrismaService } from './prisma';

@Module({
  imports: [
    JwtModule.register({
      secret: "18291206",
    }),
    ProfileModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],  
})
export class AppModule {}

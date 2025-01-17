import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import PrimaService from './prisma';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: "a123b123c123d123",
    })],
  controllers: [AppController],
  providers: [AppService, PrimaService],  
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BedsController } from './bed.controller';
import { BedsService } from './bed.service';

@Module({
  controllers: [BedsController],
  providers: [BedsService, PrismaService],
})
export class BedsModule {}

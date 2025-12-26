import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { FloorsController } from './floor.controller';
import { FloorsService } from './floor.service';

@Module({
  controllers: [FloorsController],
  providers: [FloorsService, PrismaService],
})
export class FloorsModule {}

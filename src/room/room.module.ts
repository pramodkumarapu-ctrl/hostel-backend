import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoomsController } from './room.controller';
import { RoomsService } from './room.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, PrismaService],
})
export class RoomsModule {}

import { Module } from '@nestjs/common';
import { HostelTimingService } from './hostel-timing.service';
import { HostelTimingController } from './hostel-timing.controller';

@Module({
  controllers: [HostelTimingController],
  providers: [HostelTimingService],
})
export class HostelTimingModule {}

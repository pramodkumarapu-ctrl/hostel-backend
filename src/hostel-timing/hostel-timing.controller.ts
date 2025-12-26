import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HostelTimingService } from './hostel-timing.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../zod.pipe';
import { createTimingSchema, updateTimingSchema } from './hostel-timing.zod';

@Controller('hostel-timings')
@UseGuards(AuthGuard('jwt'))
export class HostelTimingController {
  constructor(private service: HostelTimingService) {}

  // CREATE TIMING
  @Post()
  create(@Body(new ZodValidationPipe(createTimingSchema)) body: any) {
    return this.service.create(body);
  }

  // GET ALL TIMINGS
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET TIMING BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE TIMING
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTimingSchema)) body: any,
  ) {
    return this.service.update(id, body);
  }

  // DELETE TIMING
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

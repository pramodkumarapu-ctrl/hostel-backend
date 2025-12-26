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
import { ComplaintService } from './complaint.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../zod.pipe';
import { createComplaintSchema, updateComplaintSchema } from './complaint.zod';

@Controller('complaints')
@UseGuards(AuthGuard('jwt'))
export class ComplaintController {
  constructor(private service: ComplaintService) {}

  // CREATE COMPLAINT
  @Post()
  create(@Body(new ZodValidationPipe(createComplaintSchema)) body: any) {
    return this.service.create(body);
  }

  // GET ALL COMPLAINTS
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET COMPLAINT BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE COMPLAINT
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateComplaintSchema)) body: any,
  ) {
    return this.service.update(id, body);
  }

  // DELETE COMPLAINT
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

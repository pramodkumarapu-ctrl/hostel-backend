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
import { StaffService } from './staff.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../zod.pipe';
import {
  createStaffSchema,
  updateStaffSchema,
} from './staff.zod';

@Controller('staff')
@UseGuards(AuthGuard('jwt')) // JWT PROTECTED
export class StaffController {
  constructor(private service: StaffService) {}

  // CREATE STAFF
  @Post()
  create(@Body(new ZodValidationPipe(createStaffSchema)) body: any) {
    return this.service.create(body);
  }

  // GET ALL STAFF
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET STAFF BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE STAFF
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateStaffSchema)) body: any,
  ) {
    return this.service.update(id, body);
  }

  // DELETE STAFF
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

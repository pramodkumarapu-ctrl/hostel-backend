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
import { LeaveService } from './leave.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../zod.pipe';
import { createLeaveSchema, updateLeaveSchema } from './leave.zod';

@Controller('leaves')
@UseGuards(AuthGuard('jwt'))
export class LeaveController {
  constructor(private service: LeaveService) {}

  // CREATE LEAVE
  @Post()
  create(@Body(new ZodValidationPipe(createLeaveSchema)) body: any) {
    return this.service.create(body);
  }

  // GET ALL LEAVES
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET LEAVE BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE LEAVE
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateLeaveSchema)) body: any,
  ) {
    return this.service.update(id, body);
  }

  // DELETE LEAVE
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

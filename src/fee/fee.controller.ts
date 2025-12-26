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
import { FeeService } from './fee.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../zod.pipe';
import { createFeeSchema, updateFeeSchema } from './fee.zod';

@Controller('fees')
@UseGuards(AuthGuard('jwt'))
export class FeeController {
  constructor(private service: FeeService) {}

  // CREATE FEE
  @Post()
  create(@Body(new ZodValidationPipe(createFeeSchema)) body: any) {
    return this.service.create(body);
  }

  // GET ALL FEES
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET FEE BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE FEE
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateFeeSchema)) body: any,
  ) {
    return this.service.update(id, body);
  }

  // DELETE FEE
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

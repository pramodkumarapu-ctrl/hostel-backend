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
import { VisitorService } from './visitor.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../zod.pipe';
import { createVisitorSchema, updateVisitorSchema } from './visitor.zod';

@Controller('visitors')
@UseGuards(AuthGuard('jwt'))
export class VisitorController {
  constructor(private service: VisitorService) {}

  // CREATE VISITOR
  @Post()
  create(@Body(new ZodValidationPipe(createVisitorSchema)) body: any) {
    return this.service.create(body);
  }

  // GET ALL VISITORS
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET VISITOR BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE VISITOR
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateVisitorSchema)) body: any,
  ) {
    return this.service.update(id, body);
  }

  // DELETE VISITOR
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

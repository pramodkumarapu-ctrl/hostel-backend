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
import { FacilityService } from './facility.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../zod.pipe';
import { createFacilitySchema, updateFacilitySchema } from './facility.zod';

@Controller('facilities')
@UseGuards(AuthGuard('jwt'))
export class FacilityController {
  constructor(private service: FacilityService) {}

  // CREATE FACILITY
  @Post()
  create(@Body(new ZodValidationPipe(createFacilitySchema)) body: any) {
    return this.service.create(body);
  }

  // GET ALL FACILITIES
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET FACILITY BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE FACILITY
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateFacilitySchema)) body: any,
  ) {
    return this.service.update(id, body);
  }

  // DELETE FACILITY
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

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
import { EmergencyService } from './emergency.service';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../zod.pipe';
import { createEmergencySchema, updateEmergencySchema } from './emergency.zod';

@Controller('emergency')
@UseGuards(AuthGuard('jwt'))
export class EmergencyController {
  constructor(private service: EmergencyService) {}

  // CREATE EMERGENCY CONTACT
  @Post()
  create(@Body(new ZodValidationPipe(createEmergencySchema)) body: any) {
    return this.service.create(body);
  }

  // GET ALL EMERGENCY CONTACTS
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET EMERGENCY CONTACT BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // UPDATE EMERGENCY CONTACT
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateEmergencySchema)) body: any,
  ) {
    return this.service.update(id, body);
  }

  // DELETE EMERGENCY CONTACT
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

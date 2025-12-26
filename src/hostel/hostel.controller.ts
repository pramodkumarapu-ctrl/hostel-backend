import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { HostelService } from './hostel.service';

@Controller('hostels')
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}

  // CREATE HOSTEL
  @Post()
  create(
    @Body() body: any,
    @Query('ownerId') ownerId: string,
  ) {
    return this.hostelService.create(body, ownerId);
  }

  // GET ALL HOSTELS (BY OWNER)
  @Get()
  findAll(@Query('ownerId') ownerId: string) {
    return this.hostelService.findAll(ownerId);
  }

  // GET HOSTEL BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostelService.findOne(id);
  }

  // UPDATE HOSTEL (PUT)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.hostelService.update(id, body);
  }

  // UPDATE HOSTEL (PATCH)
  @Patch(':id')
  patch(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.hostelService.update(id, body);
  }

  // DELETE HOSTEL
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostelService.remove(id);
  }
}

// rooms.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoomsService } from './room.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.roomsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.roomsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Make sure to handle relations
    return this.roomsService.remove(id);
  }
}

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ResidentService } from './resident.service';

@Controller('residents')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Get()
  findAll() {
    return this.residentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residentService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.residentService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.residentService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residentService.remove(id);
  }
}

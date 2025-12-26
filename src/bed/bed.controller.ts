import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { BedsService } from './bed.service';
import { BedStatus } from '@prisma/client';


@Controller('beds')
export class BedsController {
  constructor(private readonly bedsService: BedsService) {}

  @Get()
  async getAll() {
    return this.bedsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const bed = await this.bedsService.findOne(id);
    if (!bed) throw new HttpException('Bed not found', HttpStatus.NOT_FOUND);
    return bed;
  }

  @Post()
  async create(@Body() body: { bedNo: string; status?: BedStatus; roomId: string; hostelId: string }) {
    try {
      return await this.bedsService.create(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<{ bedNo: string; status: BedStatus; roomId: string; hostelId: string }>) {
    try {
      return await this.bedsService.update(id, body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.bedsService.remove(id);
    } catch (e) {
      throw new HttpException('Cannot delete bed, it may be occupied.', HttpStatus.BAD_REQUEST);
    }
  }
}


import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { FloorsService } from './floor.service';

@Controller('floors')
export class FloorsController {
  constructor(private readonly floorsService: FloorsService) {}

  /* ================= CREATE ================= */
  @Post()
  create(@Body() body: { number: number; hostelId: string }) {
    return this.floorsService.create({
      number: Number(body.number),
      hostelId: body.hostelId,
    });
  }

  /* ================= FIND ALL ================= */
  @Get()
  findAll() {
    return this.floorsService.findAll();
  }

  /* ================= FIND ONE ================= */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.floorsService.findOne(id);
  }

  /* ================= UPDATE ================= */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { number?: number; hostelId?: string },
  ) {
    return this.floorsService.update(id, {
      number: body.number ? Number(body.number) : undefined,
      hostelId: body.hostelId,
    });
  }

  /* ================= DELETE ================= */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.floorsService.remove(id);
  }
}

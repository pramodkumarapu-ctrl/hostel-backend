import { Controller, Get, Post, Delete, Body, Query, Param } from '@nestjs/common';
import { FoodMenuService } from './food-menu.service';

@Controller('food-menus')
export class FoodMenuController {
  constructor(private readonly service: FoodMenuService) {}

  @Post() // Used for both Save and Edit
  async saveOrUpdate(@Body() body: any) {
    return this.service.upsertMenu(body);
  }

  @Get()
  async getByHostel(@Query('hostelId') hostelId: string) {
    return this.service.findAll(hostelId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
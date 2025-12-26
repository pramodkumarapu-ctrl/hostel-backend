import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FoodMenuService {
  constructor(private prisma: PrismaService) {}

  // CREATE & UPDATE (Dynamic Upsert)
  async upsertMenu(data: any) {
    const { hostelId, dayType, mealType, items, startTime, endTime } = data;

    return this.prisma.foodMenu.upsert({
      where: {
        hostelId_dayType_mealType: { hostelId, dayType, mealType },
      },
      update: { items, startTime, endTime },
      create: { hostelId, dayType, mealType, items, startTime, endTime },
    });
  }

  // READ ALL (By Hostel)
  async findAll(hostelId: string) {
    return this.prisma.foodMenu.findMany({
      where: { hostelId },
      orderBy: { dayType: 'asc' },
    });
  }

  // DELETE
  async delete(id: string) {
    return this.prisma.foodMenu.delete({ where: { id } });
  }
}
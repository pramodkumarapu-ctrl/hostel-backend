import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FloorsService {
  constructor(private prisma: PrismaService) {}

  /* ================= CREATE ================= */
  async create(data: { number: number; hostelId: string }) {
    return this.prisma.floor.create({
      data,
    });
  }

  /* ================= FIND ALL ================= */
  async findAll() {
    return this.prisma.floor.findMany({
      include: {
        hostel: {
          select: { id: true, name: true },
        },
        rooms: true,
      },
      orderBy: { number: 'asc' },
    });
  }

  /* ================= FIND ONE ================= */
  async findOne(id: string) {
    const floor = await this.prisma.floor.findUnique({
      where: { id },
      include: {
        hostel: true,
        rooms: true,
      },
    });

    if (!floor) {
      throw new NotFoundException('Floor not found');
    }

    return floor;
  }

  /* ================= UPDATE ================= */
  async update(id: string, data: { number?: number; hostelId?: string }) {
    try {
      return await this.prisma.floor.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(
        'Floor number already exists for this hostel',
      );
    }
  }

  /* ================= DELETE ================= */
  async remove(id: string) {
    return this.prisma.floor.delete({
      where: { id },
    });
  }
}

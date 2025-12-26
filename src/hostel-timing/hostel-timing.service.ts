import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HostelTimingService {
  constructor(private prisma: PrismaService) {}

  // CREATE TIMING
  async create(data: any) {
    const hostel = await this.prisma.hostel.findUnique({ where: { id: data.hostelId } });
    if (!hostel) throw new ForbiddenException('Hostel not found');

    return this.prisma.hostelTiming.create({ data });
  }

  // GET ALL TIMINGS
  findAll() {
    return this.prisma.hostelTiming.findMany({ include: { hostel: true } });
  }

  // GET TIMING BY ID
  findOne(id: string) {
    return this.prisma.hostelTiming.findUnique({ where: { id }, include: { hostel: true } });
  }

  // UPDATE TIMING
  async update(id: string, data: any) {
    const timing = await this.prisma.hostelTiming.findUnique({ where: { id } });
    if (!timing) throw new ForbiddenException('Timing not found');

    return this.prisma.hostelTiming.update({ where: { id }, data });
  }

  // DELETE TIMING
  async delete(id: string) {
    const timing = await this.prisma.hostelTiming.findUnique({ where: { id } });
    if (!timing) throw new ForbiddenException('Timing not found');

    return this.prisma.hostelTiming.delete({ where: { id } });
  }
}

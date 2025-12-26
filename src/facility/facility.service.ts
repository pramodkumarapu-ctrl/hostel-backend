import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FacilityService {
  constructor(private prisma: PrismaService) {}

  // CREATE FACILITY
  async create(data: any) {
    const hostel = await this.prisma.hostel.findUnique({ where: { id: data.hostelId } });
    if (!hostel) throw new ForbiddenException('Hostel not found');

    return this.prisma.facility.create({ data });
  }

  // GET ALL FACILITIES
  findAll() {
    return this.prisma.facility.findMany({ include: { hostel: true } });
  }

  // GET FACILITY BY ID
  findOne(id: string) {
    return this.prisma.facility.findUnique({ where: { id }, include: { hostel: true } });
  }

  // UPDATE FACILITY
  async update(id: string, data: any) {
    const facility = await this.prisma.facility.findUnique({ where: { id } });
    if (!facility) throw new ForbiddenException('Facility not found');

    return this.prisma.facility.update({ where: { id }, data });
  }

  // DELETE FACILITY
  async delete(id: string) {
    const facility = await this.prisma.facility.findUnique({ where: { id } });
    if (!facility) throw new ForbiddenException('Facility not found');

    return this.prisma.facility.delete({ where: { id } });
  }
}

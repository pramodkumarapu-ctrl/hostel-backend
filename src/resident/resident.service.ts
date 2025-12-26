import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResidentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.resident.findMany({
      include: {
        hostel: true,
        bed: { include: { room: true } },
      },
      orderBy: { fullName: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.resident.findUnique({
      where: { id },
      include: { hostel: true, bed: { include: { room: true } } },
    });
  }

  async create(data: any) {
    return this.prisma.resident.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        hostelId: data.hostelId,
        bedId: data.bedId || null,
        stayStart: new Date(data.stayStart),
        stayEnd: data.stayEnd ? new Date(data.stayEnd) : null,
        status: data.status || 'ACTIVE',
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.resident.update({
      where: { id },
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        hostelId: data.hostelId,
        bedId: data.bedId || null,
        stayStart: new Date(data.stayStart),
        stayEnd: data.stayEnd ? new Date(data.stayEnd) : null,
        status: data.status || 'ACTIVE',
      },
    });
  }

  async remove(id: string) {
    return this.prisma.resident.delete({ where: { id } });
  }
}

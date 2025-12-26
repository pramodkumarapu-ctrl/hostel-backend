import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HostelService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(data: any, ownerId: string) {
    return this.prisma.hostel.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone ?? '',
        ownerId,
      },
    });
  }

  // FIND ALL (BY OWNER)
  findAll(ownerId: string) {
    return this.prisma.hostel.findMany({
      where: ownerId ? { ownerId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  // FIND ONE
  async findOne(id: string) {
    const hostel = await this.prisma.hostel.findUnique({
      where: { id },
    });

    if (!hostel) {
      throw new NotFoundException('Hostel not found');
    }

    return hostel;
  }

  // UPDATE (PUT / PATCH)
  async update(id: string, data: any) {
    const exists = await this.prisma.hostel.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Hostel not found');
    }

    return this.prisma.hostel.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.address && { address: data.address }),
        ...(data.phone && { phone: data.phone }),
      },
    });
  }

  // DELETE
  async remove(id: string) {
    const exists = await this.prisma.hostel.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Hostel not found');
    }

    return this.prisma.hostel.delete({
      where: { id },
    });
  }
}

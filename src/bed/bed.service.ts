import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bed ,BedStatus } from '@prisma/client';


@Injectable()
export class BedsService {
  constructor(private prisma: PrismaService) {}

  // GET ALL BEDS WITH RELATIONS
  async findAll(): Promise<Bed[]> {
    return this.prisma.bed.findMany({
      include: {
        room: true,
        hostel: true,
        resident: true,
      },
      orderBy: { bedNo: 'asc' },
    });
  }

  // GET SINGLE BED
  async findOne(id: string): Promise<Bed | null> {
    return this.prisma.bed.findUnique({
      where: { id },
      include: { room: true, hostel: true, resident: true },
    });
  }

  // CREATE BED
  async create(data: {
    bedNo: string;
    status?: BedStatus;
    roomId: string;
    hostelId: string;
  }): Promise<Bed> {
    return this.prisma.bed.create({
      data,
      include: { room: true, hostel: true, resident: true },
    });
  }

  // UPDATE BED
  async update(id: string, data: Partial<{ bedNo: string; status: BedStatus; roomId: string; hostelId: string }>): Promise<Bed> {
    return this.prisma.bed.update({
      where: { id },
      data,
      include: { room: true, hostel: true, resident: true },
    });
  }

  // DELETE BED
  async remove(id: string): Promise<Bed> {
    return this.prisma.bed.delete({
      where: { id },
    });
  }
}

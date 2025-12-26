import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  // CREATE STAFF (OWNER / ADMIN ONLY)
  async create(data: any) {
    // Check if user already a staff
    const existingStaff = await this.prisma.staff.findUnique({
      where: { userId: data.userId },
    });
    if (existingStaff) {
      throw new ForbiddenException('User is already a staff');
    }

    return this.prisma.staff.create({
      data,
    });
  }

  // GET ALL STAFF
  findAll() {
    return this.prisma.staff.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        hostel: { select: { id: true, name: true } },
      },
    });
  }

  // GET STAFF BY ID
  findOne(id: string) {
    return this.prisma.staff.findUnique({
      where: { id },
      include: {
        user: true,
        hostel: true,
      },
    });
  }

  // UPDATE STAFF
  update(id: string, data: any) {
    return this.prisma.staff.update({
      where: { id },
      data,
    });
  }

  // DELETE STAFF
  delete(id: string) {
    return this.prisma.staff.delete({
      where: { id },
    });
  }
}

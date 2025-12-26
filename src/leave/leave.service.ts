import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  // CREATE LEAVE
  async create(data: any) {
    const resident = await this.prisma.resident.findUnique({ where: { id: data.residentId } });
    if (!resident) throw new ForbiddenException('Resident not found');

    return this.prisma.leaveRequest.create({ data });
  }

  // GET ALL LEAVES
  findAll() {
    return this.prisma.leaveRequest.findMany({ include: { resident: true } });
  }

  // GET LEAVE BY ID
  findOne(id: string) {
    return this.prisma.leaveRequest.findUnique({ where: { id }, include: { resident: true } });
  }

  // UPDATE LEAVE
  async update(id: string, data: any) {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leave) throw new ForbiddenException('Leave request not found');

    return this.prisma.leaveRequest.update({ where: { id }, data });
  }

  // DELETE LEAVE
  async delete(id: string) {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leave) throw new ForbiddenException('Leave request not found');

    return this.prisma.leaveRequest.delete({ where: { id } });
  }
}

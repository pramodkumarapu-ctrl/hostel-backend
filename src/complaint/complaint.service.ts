import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ComplaintService {
  constructor(private prisma: PrismaService) {}

  // CREATE COMPLAINT
  async create(data: any) {
    // Check if resident exists
    const resident = await this.prisma.resident.findUnique({ where: { id: data.residentId } });
    if (!resident) throw new ForbiddenException('Resident not found');

    return this.prisma.complaint.create({ data });
  }

  // GET ALL COMPLAINTS
  findAll() {
    return this.prisma.complaint.findMany({ include: { resident: true } });
  }

  // GET COMPLAINT BY ID
  findOne(id: string) {
    return this.prisma.complaint.findUnique({ where: { id }, include: { resident: true } });
  }

  // UPDATE COMPLAINT
  async update(id: string, data: any) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } });
    if (!complaint) throw new ForbiddenException('Complaint not found');

    return this.prisma.complaint.update({ where: { id }, data });
  }

  // DELETE COMPLAINT
  async delete(id: string) {
    const complaint = await this.prisma.complaint.findUnique({ where: { id } });
    if (!complaint) throw new ForbiddenException('Complaint not found');

    return this.prisma.complaint.delete({ where: { id } });
  }
}

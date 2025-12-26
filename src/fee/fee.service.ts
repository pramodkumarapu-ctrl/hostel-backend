import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeeService {
  constructor(private prisma: PrismaService) {}

  // CREATE FEE
  async create(data: any) {
    // Check if resident exists
    const resident = await this.prisma.resident.findUnique({ where: { id: data.residentId } });
    if (!resident) throw new ForbiddenException('Resident not found');

    // Check unique constraint (residentId + month + year)
    const existing = await this.prisma.fee.findUnique({
      where: { residentId_month_year: { residentId: data.residentId, month: data.month, year: data.year } },
    });
    if (existing) throw new ForbiddenException('Fee already exists for this month/year');

    return this.prisma.fee.create({ data });
  }

  // GET ALL FEES
  findAll() {
    return this.prisma.fee.findMany({ include: { resident: true, payments: true } });
  }

  // GET FEE BY ID
  findOne(id: string) {
    return this.prisma.fee.findUnique({ where: { id }, include: { resident: true, payments: true } });
  }

  // UPDATE FEE
  async update(id: string, data: any) {
    const fee = await this.prisma.fee.findUnique({ where: { id } });
    if (!fee) throw new ForbiddenException('Fee not found');

    return this.prisma.fee.update({ where: { id }, data });
  }

  // DELETE FEE
  async delete(id: string) {
    const fee = await this.prisma.fee.findUnique({ where: { id } });
    if (!fee) throw new ForbiddenException('Fee not found');

    return this.prisma.fee.delete({ where: { id } });
  }
}

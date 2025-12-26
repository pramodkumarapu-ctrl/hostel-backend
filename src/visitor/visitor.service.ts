import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitorService {
  constructor(private prisma: PrismaService) {}

  // CREATE VISITOR
  async create(data: any) {
    const resident = await this.prisma.resident.findUnique({ where: { id: data.residentId } });
    if (!resident) throw new ForbiddenException('Resident not found');

    return this.prisma.visitor.create({ data });
  }

  // GET ALL VISITORS
  findAll() {
    return this.prisma.visitor.findMany({ include: { resident: true } });
  }

  // GET VISITOR BY ID
  findOne(id: string) {
    return this.prisma.visitor.findUnique({ where: { id }, include: { resident: true } });
  }

  // UPDATE VISITOR
  async update(id: string, data: any) {
    const visitor = await this.prisma.visitor.findUnique({ where: { id } });
    if (!visitor) throw new ForbiddenException('Visitor not found');

    return this.prisma.visitor.update({ where: { id }, data });
  }

  // DELETE VISITOR
  async delete(id: string) {
    const visitor = await this.prisma.visitor.findUnique({ where: { id } });
    if (!visitor) throw new ForbiddenException('Visitor not found');

    return this.prisma.visitor.delete({ where: { id } });
  }
}

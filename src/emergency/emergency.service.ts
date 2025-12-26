import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmergencyService {
  constructor(private prisma: PrismaService) {}

  // CREATE EMERGENCY CONTACT
  async create(data: any) {
    const resident = await this.prisma.resident.findUnique({ where: { id: data.residentId } });
    if (!resident) throw new ForbiddenException('Resident not found');

    return this.prisma.emergencyContact.create({ data });
  }

  // GET ALL EMERGENCY CONTACTS
  findAll() {
    return this.prisma.emergencyContact.findMany({ include: { resident: true } });
  }

  // GET EMERGENCY CONTACT BY ID
  findOne(id: string) {
    return this.prisma.emergencyContact.findUnique({ where: { id }, include: { resident: true } });
  }

  // UPDATE EMERGENCY CONTACT
  async update(id: string, data: any) {
    const contact = await this.prisma.emergencyContact.findUnique({ where: { id } });
    if (!contact) throw new ForbiddenException('Emergency contact not found');

    return this.prisma.emergencyContact.update({ where: { id }, data });
  }

  // DELETE EMERGENCY CONTACT
  async delete(id: string) {
    const contact = await this.prisma.emergencyContact.findUnique({ where: { id } });
    if (!contact) throw new ForbiddenException('Emergency contact not found');

    return this.prisma.emergencyContact.delete({ where: { id } });
  }
}

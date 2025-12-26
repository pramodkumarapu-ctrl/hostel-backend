// rooms.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.room.findMany({
      include: { beds: true, floor: true, hostel: true },
    });
  }

  create(data: any) {
    return this.prisma.room.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.room.update({ where: { id }, data });
  }

  async remove(id: string) {
    // Delete related beds first to avoid FK error
    await this.prisma.bed.deleteMany({ where: { roomId: id } });

    // Then delete the room
    return this.prisma.room.delete({ where: { id } });
  }
}

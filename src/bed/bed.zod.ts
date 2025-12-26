import { z } from 'zod';
import { BedStatus } from '@prisma/client';

export const createBedSchema = z.object({
  roomId: z.string().uuid(),
  hostelId: z.string().uuid(),
  bedNo: z.string().min(1),
  status: z.nativeEnum(BedStatus).optional(),
});

export const updateBedSchema = z.object({
  bedNo: z.string().min(1).optional(),
  status: z.nativeEnum(BedStatus).optional(),
});

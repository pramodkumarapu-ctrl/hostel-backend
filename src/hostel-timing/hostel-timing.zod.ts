import { z } from 'zod';
import { DayType } from '@prisma/client';

export const createTimingSchema = z.object({
  hostelId: z.string().uuid(),
  dayType: z.nativeEnum(DayType),
  inTime: z.string(),
  outTime: z.string(),
});

export const updateTimingSchema = z.object({
  dayType: z.nativeEnum(DayType).optional(),
  inTime: z.string().optional(),
  outTime: z.string().optional(),
});

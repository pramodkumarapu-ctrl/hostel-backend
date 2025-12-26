import { z } from 'zod';

export const createFacilitySchema = z.object({
  hostelId: z.string().uuid(),
  name: z.string().min(2),
  description: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateFacilitySchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isActive: z.boolean().optional(),
});

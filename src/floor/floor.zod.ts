import { z } from 'zod';

export const createFloorSchema = z.object({
  hostelId: z.string().uuid(),
  number: z.number().min(1),
});

export const updateFloorSchema = z.object({
  number: z.number().min(1).optional(),
});

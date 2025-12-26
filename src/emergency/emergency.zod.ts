import { z } from 'zod';

export const createEmergencySchema = z.object({
  residentId: z.string().uuid(),
  name: z.string().min(2),
  phone: z.string().min(7),
  relation: z.string().min(2),
});

export const updateEmergencySchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(7).optional(),
  relation: z.string().min(2).optional(),
});

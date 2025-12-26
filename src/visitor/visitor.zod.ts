import { z } from 'zod';

export const createVisitorSchema = z.object({
  residentId: z.string().uuid(),
  name: z.string().min(2),
  relation: z.string().min(2),
  inTime: z.string(),
  outTime: z.string().optional(),
});

export const updateVisitorSchema = z.object({
  name: z.string().min(2).optional(),
  relation: z.string().min(2).optional(),
  inTime: z.string().optional(),
  outTime: z.string().optional(),
});

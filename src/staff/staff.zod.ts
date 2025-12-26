import { z } from 'zod';

export const createStaffSchema = z.object({
  userId: z.string().uuid(),
  hostelId: z.string().uuid(),
  role: z.string().min(2),
  phone: z.string().min(10),
});

export const updateStaffSchema = z.object({
  role: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
});

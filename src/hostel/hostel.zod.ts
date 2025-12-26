import { z } from 'zod';

export const createHostelSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(5),
  phone: z.string().min(10),
});

export const updateHostelSchema = z.object({
  name: z.string().min(3).optional(),
  address: z.string().min(5).optional(),
  phone: z.string().min(10).optional(),
});

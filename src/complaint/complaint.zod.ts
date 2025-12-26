import { z } from 'zod';
import { ComplaintStatus } from '@prisma/client';

export const createComplaintSchema = z.object({
  residentId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(5),
  status: z.nativeEnum(ComplaintStatus).optional(),
});

export const updateComplaintSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  status: z.nativeEnum(ComplaintStatus).optional(),
});

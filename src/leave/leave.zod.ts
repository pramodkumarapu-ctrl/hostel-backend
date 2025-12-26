import { z } from 'zod';
import { LeaveStatus } from '@prisma/client';

export const createLeaveSchema = z.object({
  residentId: z.string().uuid(),
  fromDate: z.string(),
  toDate: z.string(),
  reason: z.string().min(5),
  status: z.nativeEnum(LeaveStatus).optional(),
});

export const updateLeaveSchema = z.object({
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  reason: z.string().min(5).optional(),
  status: z.nativeEnum(LeaveStatus).optional(),
});

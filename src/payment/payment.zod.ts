import { z } from 'zod';
import { PaymentMethod, FeeStatus } from '@prisma/client';

export const createPaymentSchema = z.object({
  feeId: z.string().uuid(),
  residentId: z.string().uuid(),
  amount: z.number().positive(),
  method: z.nativeEnum(PaymentMethod),
  paidAt: z.string().datetime().optional(),
});

export const updatePaymentSchema = z.object({
  amount: z.number().positive().optional(),
  method: z.nativeEnum(PaymentMethod).optional(),
  paidAt: z.string().datetime().optional(),
});

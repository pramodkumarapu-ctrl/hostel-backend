import { z } from 'zod';
import { FeeStatus, PaymentMethod } from '@prisma/client';

export const createFeeSchema = z.object({
  residentId: z.string().uuid(),
  month: z.number().min(1).max(12),
  year: z.number().min(2000),
  amount: z.number().min(0),
  status: z.nativeEnum(FeeStatus),
});

export const updateFeeSchema = z.object({
  month: z.number().min(1).max(12).optional(),
  year: z.number().min(2000).optional(),
  amount: z.number().min(0).optional(),
  status: z.nativeEnum(FeeStatus).optional(),
});

export const createPaymentSchema = z.object({
  feeId: z.string().uuid(),
  residentId: z.string().uuid(),
  amount: z.number().min(0),
  method: z.nativeEnum(PaymentMethod),
});

export const updatePaymentSchema = z.object({
  amount: z.number().min(0).optional(),
  method: z.nativeEnum(PaymentMethod).optional(),
});

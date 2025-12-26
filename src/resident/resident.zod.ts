import { z } from 'zod';
import { ResidentStatus } from '@prisma/client';

export const createResidentSchema = z.object({
  hostelId: z.string().uuid(),
  fullName: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email(),
  bedId: z.string().uuid().optional(),
  stayStart: z.string(),
  stayEnd: z.string().optional(),
  status: z.nativeEnum(ResidentStatus).optional(),
});

export const updateResidentSchema = z.object({
  fullName: z.string().min(3).optional(),
  phone: z.string().min(10).optional(),
  email: z.string().email().optional(),
  bedId: z.string().uuid().optional(),
  stayStart: z.string().optional(),
  stayEnd: z.string().optional(),
  status: z.nativeEnum(ResidentStatus).optional(),
});

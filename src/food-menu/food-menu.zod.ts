import { z } from 'zod';
import { DayType, MealType } from '@prisma/client';

export const createFoodMenuSchema = z.object({
  hostelId: z.string().uuid(),
  dayType: z.nativeEnum(DayType),
  mealType: z.nativeEnum(MealType),
  items: z.string().min(1),
  startTime: z.string(),
  endTime: z.string(),
});

export const updateFoodMenuSchema = z.object({
  dayType: z.nativeEnum(DayType).optional(),
  mealType: z.nativeEnum(MealType).optional(),
  items: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

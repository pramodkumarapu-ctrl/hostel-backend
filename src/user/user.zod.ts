import { z } from 'zod';

// Register
export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['OWNER', 'ADMIN', 'STAFF']),
});

// Login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Update user
export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['OWNER', 'ADMIN', 'STAFF']).optional(),
});

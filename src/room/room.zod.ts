import { z } from 'zod';
import { RoomType, SharingType } from '@prisma/client';

export const createRoomSchema = z.object({
  floorId: z.string().uuid(),
  hostelId: z.string().uuid(),
  roomNo: z.string().min(1),
  type: z.nativeEnum(RoomType),
  sharing: z.nativeEnum(SharingType),
});

export const updateRoomSchema = z.object({
  roomNo: z.string().min(1).optional(),
  type: z.nativeEnum(RoomType).optional(),
  sharing: z.nativeEnum(SharingType).optional(),
});

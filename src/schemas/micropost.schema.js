import { z } from 'zod';

export const createMicropostSchema = z.object({
  title: z.string().min(1, 'Title is required').trim()
});

export const micropostIdSchema = z.object({
  id: z.coerce.number().int().positive()
});
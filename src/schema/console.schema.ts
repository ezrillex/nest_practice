import { z } from 'zod';

export const createConsoleSchema = z
  .object({
    name: z.string(),
    release_year: z.number(),
  })
  .required();

export type CreateConsoleDto = z.infer<typeof createConsoleSchema>;

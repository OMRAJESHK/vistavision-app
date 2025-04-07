import { z } from 'zod'

export const PaginationValidator = z
  .object({
    limit: z.string().optional().default('10'),
    page: z.string().optional().default('1'),
  })
  .strict()

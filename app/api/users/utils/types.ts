import { z } from 'zod'
import { UpdatedUserValidator, UserValidator } from './validation'

export type UserType = z.infer<typeof UserValidator>
export type UpdateUserType = z.infer<typeof UpdatedUserValidator>
export type ParamsType = { params: { userId: string } }

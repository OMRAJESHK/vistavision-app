import { z } from 'zod'
import { PaginationValidator } from './validator'

export type PaginationSchemaType = z.infer<typeof PaginationValidator>
export type QueryType = z.infer<typeof PaginationValidator>

export type PaginationType = {
  total: number
  currentPage: number
  totalPages: number
}
export type ResponseType = {
  message?: string
  pagination?: PaginationType
  data?: object | object[]
  error?: object | unknown
}

import { NextResponse } from 'next/server'
import { PaginationType, QueryType, ResponseType } from './types'
import { PaginationValidator } from './validator'

export function getPaginationValidation(urlString: string) {
  const url = new URL(urlString)
  const query = Object.fromEntries(url.searchParams) as QueryType
  return PaginationValidator.safeParse(query)
}
export function sendResponse(content: ResponseType, statusCode: number) {
  return NextResponse.json(content, { status: statusCode })
}
export function getPagination(limit: string, page: string, totalUsers: number) {
  const limitValue = parseInt(limit, 10)
  const pageValue = parseInt(page, 10)

  const pagination: PaginationType = {
    total: totalUsers,
    currentPage: pageValue,
    totalPages: Math.ceil(totalUsers / limitValue),
  }
  return pagination
}

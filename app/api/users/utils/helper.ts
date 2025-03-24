import { type ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import User from '@/modals/user'
import {
  type QueryType,
  type PaginationType,
  type ResponseType,
  type UpdateUserType,
  type UserType,
} from './dataTypes'
import { PaginationValidator, UpdatedUserValidator } from './validation'
import { NextResponse } from 'next/server'

export async function getFormatedUser(body: UserType) {
  const user: UserType = {
    ...body,
    display_password: body.password,
    created_date: new Date(),
  }
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  return user
}

export function getPaginationValidation(urlString: string) {
  const url = new URL(urlString)
  const query = Object.fromEntries(url.searchParams) as QueryType
  return PaginationValidator.safeParse(query)
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

export async function getUsers(limit: string, page: string) {
  const limitValue = parseInt(limit, 10)
  const pageValue = parseInt(page, 10)

  const users: UserType[] = await User.find()
    .limit(limitValue)
    .skip((pageValue - 1) * limitValue)
  return users
}
export async function insertUser(user: UserType) {
  const createUser = new User(user)
  const response = await createUser.save()
  return response
}

export async function updateUser(id: ObjectId, user: UserType) {
  const response = await User.findByIdAndUpdate(id, { user }, { new: true })
  return response
}

export function userValidation(user: UpdateUserType) {
  const validation = UpdatedUserValidator.safeParse(user)
  if (!validation.success) {
    const errResponse = validation.error.issues[0]
    return NextResponse.json({ error: errResponse }, { status: 400 })
  }
  return true
}

export function sendResponse(content: ResponseType, statusCode: number) {
  return NextResponse.json(content, { status: statusCode })
}

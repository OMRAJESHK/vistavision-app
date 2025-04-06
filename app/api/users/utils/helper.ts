import { type ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import User from '@/server/modals/user'
import { type UpdateUserType, type UserType } from './types'
import { UpdatedUserValidator } from './validation'
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

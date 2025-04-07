import { connectToDB } from '@/server/lib/db'
import { NextRequest } from 'next/server'
import { getAllAssets, getFormatedAsset, insertAsset } from './utils/helper'
import { type AssetType } from './utils/types'
import Asset from '@/server/modals/assetApp/asset'
import { AssetCreateValidator } from './utils/validation'
import {
  getPaginationValidation,
  getPagination,
  sendResponse,
} from '@/server/helper'

export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    const validation = getPaginationValidation(req.url)
    if (!validation.success) {
      return sendResponse(
        { error: validation.error.errors, message: 'Invalid Paginaton Query' },
        400
      )
    } else {
      const { limit = '10', page = '1' } = validation.data

      const users: AssetType[] = await getAllAssets(limit, page)
      const totalUsers: number = await Asset.countDocuments()
      const pagination = getPagination(limit, page, totalUsers)

      return sendResponse({ pagination: pagination, data: users }, 200)
    }
  } catch (err) {
    console.error(err)
    const error = err as { message: string }
    return sendResponse({ message: error.message }, 500)
  }
}

export async function POST(req: NextRequest) {
  const body: AssetType = await req.json()
  try {
    await connectToDB()
    const asset = await getFormatedAsset(body)
    const validation = AssetCreateValidator.safeParse(body)
    if (!validation.success) {
      return sendResponse(
        {
          message: validation.error.message,
          error: validation.error,
        },
        400
      )
    } else {
      const response = await insertAsset(asset)
      return sendResponse(
        {
          message: 'Asset Created Successfully',
          data: response,
        },
        201
      )
    }
  } catch (err) {
    const error = err as { message: string; MongooseError: object }
    return sendResponse({ message: error.message }, 500)
  }
}

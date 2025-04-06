import {
  getPagination,
  getPaginationValidation,
  sendResponse,
} from '@/server/helper'
import { connectToDB } from '@/server/lib/db'
import { NextRequest } from 'next/server'
import { AssetAttributeType } from './utils/types'
import {
  getAllAssetAttributes,
  getFormatedAssetAttribute,
  insertAssetAttribute,
} from './utils/helper'
import AssetAttribute from '@/server/modals/assetApp/assetAttribute'
import { assetAttributeValidator } from './utils/validation'

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

      const users: AssetAttributeType[] = await getAllAssetAttributes(
        limit,
        page
      )
      const totalUsers: number = await AssetAttribute.countDocuments()
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
  const body: AssetAttributeType = await req.json()
  try {
    await connectToDB()
    const validation = assetAttributeValidator.safeParse(body)
    if (!validation.success) {
      return sendResponse(
        {
          message: validation.error.message,
          error: validation.error,
        },
        400
      )
    } else {
      const assetAttrs = await getFormatedAssetAttribute(body)
      const response = await insertAssetAttribute(assetAttrs)
      return sendResponse(
        {
          message: 'Asset Attributes Created Successfully',
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

import { Types } from 'mongoose'
import { NextRequest } from 'next/server'
import { connectToDB } from '@/server/lib/db'
import Asset from '@/server/modals/assetApp/asset'
import { AssetUpdateType, ParamsType } from '../utils/types'
import { AssetUpdateValidator } from '../utils/validation'
import { sendResponse } from '@/server/helper'

export async function GET(req: NextRequest, { params }: ParamsType) {
  try {
    await connectToDB()

    const id = params.assetId
    if (!Types.ObjectId.isValid(id)) {
      return sendResponse({ message: 'Invalid Asset ID' }, 400)
    }

    const asset = await Asset.findById(id)
    if (!asset) {
      return sendResponse({ message: 'Asset not found' }, 404)
    }

    return sendResponse({ data: asset }, 200)
  } catch (err) {
    console.error(err)
    const error = err as { message: string }
    return sendResponse({ message: error.message }, 500)
  }
}

export async function PUT(req: Request, { params }: ParamsType) {
  try {
    await connectToDB()
    const body = await req.json()

    const id = params.assetId
    if (!Types.ObjectId.isValid(id)) {
      return sendResponse({ message: 'Invalid Asset ID' }, 400)
    }

    const asset: AssetUpdateType = body
    const validation = AssetUpdateValidator.safeParse(body)
    if (!validation.success) {
      const errResponse = validation.error.issues[0]
      return sendResponse({ error: errResponse }, 400)
    } else {
      const updatedAsset = await Asset.findByIdAndUpdate(id, asset, {
        new: true,
      })
      if (!updatedAsset) {
        return sendResponse({ data: { id }, message: 'Asset not found' }, 404)
      }
      return sendResponse(
        {
          message: 'Asset updated successfully',
          data: updatedAsset,
        },
        200
      )
    }
  } catch (err) {
    const error = err as { message: string; MongooseError: object }
    return sendResponse({ message: error.message }, 500)
  }
}

export async function DELETE(_: Request, { params }: ParamsType) {
  try {
    await connectToDB()
    const id: string = params.assetId
    if (!Types.ObjectId.isValid(id)) {
      return sendResponse({ message: 'Invalid Asset ID' }, 400)
    }

    const deletedAsset = await Asset.findByIdAndDelete(id)
    if (!deletedAsset) {
      return sendResponse({ data: { id }, message: 'Asset not found' }, 404)
    }
    return sendResponse(
      { data: { deletedAsset }, message: 'Asset Deleted successfully' },
      200
    )
  } catch (err) {
    const error = err as { message: string; MongooseError: object }
    return sendResponse({ error, message: error.message }, 500)
  }
}

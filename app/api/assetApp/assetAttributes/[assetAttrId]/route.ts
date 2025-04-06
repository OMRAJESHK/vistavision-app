import { connectToDB } from '@/server/lib/db'
import { AssetAttributeType, ParamsType } from '../utils/types'
import { NextRequest } from 'next/server'
import { Types } from 'mongoose'
import { sendResponse } from '@/server/helper'
import AssetAttribute from '@/server/modals/assetApp/assetAttribute'
import { assetAttributeValidator } from '../utils/validation'

export async function GET(req: NextRequest, { params }: ParamsType) {
  try {
    await connectToDB()

    const id = params.assetAttrId
    if (!Types.ObjectId.isValid(id)) {
      return sendResponse({ message: 'Invalid Asset Attribute ID' }, 400)
    }

    const asset = await AssetAttribute.findById(id)
    if (!asset) {
      return sendResponse({ message: 'AssetAttribute not found' }, 404)
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

    const id = params.assetAttrId
    if (!Types.ObjectId.isValid(id)) {
      return sendResponse({ message: 'Invalid AssetAttribute ID' }, 400)
    }

    const validation = assetAttributeValidator.safeParse(body)
    if (!validation.success) {
      const errResponse = validation.error.issues[0]
      return sendResponse({ error: errResponse }, 400)
    } else {
      const assetAttrs: AssetAttributeType = body
      const updatedAssetAttrs = await AssetAttribute.findByIdAndUpdate(
        id,
        assetAttrs,
        {
          new: true,
        }
      )
      if (!updatedAssetAttrs) {
        return sendResponse(
          { data: { id }, message: 'AssetAttribute not found' },
          404
        )
      }
      return sendResponse(
        {
          message: 'AssetAttribute updated successfully',
          data: updatedAssetAttrs,
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
    const id: string = params.assetAttrId
    if (!Types.ObjectId.isValid(id)) {
      return sendResponse({ message: 'Invalid AssetAttribute ID' }, 400)
    }

    const deletedAssetAttrs = await AssetAttribute.findByIdAndDelete(id)
    if (!deletedAssetAttrs) {
      return sendResponse({ data: { id }, message: 'AssetAttribute not found' }, 404)
    }
    return sendResponse(
      { data: { deletedAssetAttrs }, message: 'AssetAttribute Deleted successfully' },
      200
    )
  } catch (err) {
    const error = err as { message: string; MongooseError: object }
    return sendResponse({ error, message: error.message }, 500)
  }
}
import AssetAttribute from '@/server/modals/assetApp/assetAttribute'
import { AssetAttributeType } from './types'

export async function getAllAssetAttributes(limit: string, page: string) {
  const limitValue = parseInt(limit, 10)
  const pageValue = parseInt(page, 10)

  const assetAttributes: AssetAttributeType[] = await AssetAttribute.find()
    .limit(limitValue)
    .skip((pageValue - 1) * limitValue)
  return assetAttributes
}

export async function getFormatedAssetAttribute(body: AssetAttributeType) {
  const assetAttribute = {
    ...body,
    created_date: new Date(),
  } as AssetAttributeType & {
    created_date: Date
  }
  return assetAttribute
}

export async function insertAssetAttribute(assetAttrs: AssetAttributeType) {
  const createAssetAttrs = new AssetAttribute(assetAttrs)
  const response = await createAssetAttrs.save()
  return response
}

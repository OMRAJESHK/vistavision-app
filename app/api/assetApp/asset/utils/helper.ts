import Asset from '@/server/modals/assetApp/asset'
import { type AssetType } from './types'

export async function getAllAssets(limit: string, page: string) {
  const limitValue = parseInt(limit, 10)
  const pageValue = parseInt(page, 10)

  const assets: AssetType[] = await Asset.find()
    .limit(limitValue)
    .skip((pageValue - 1) * limitValue)
  return assets
}

export async function getFormatedAsset(body: AssetType) {
  const asset = { ...body, created_date: new Date() } as AssetType & {
    created_date: Date
  }
  return asset
}
export async function insertAsset(asset: AssetType) {
  const createAsset = new Asset(asset)
  const response = await createAsset.save()
  return response
}

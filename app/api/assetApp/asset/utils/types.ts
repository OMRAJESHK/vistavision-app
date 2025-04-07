import { z } from 'zod'
import {
  type AssetCreateValidator,
  type AssetUpdateValidator,
} from './validation'

export type AssetType = z.infer<typeof AssetCreateValidator>
export type AssetUpdateType = z.infer<typeof AssetUpdateValidator>
export type ParamsType = { params: { assetId: string } }

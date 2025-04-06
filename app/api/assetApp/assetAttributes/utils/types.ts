import { z } from 'zod'
import { assetAttributeValidator } from './validation'

export type AssetAttributeType = z.infer<typeof assetAttributeValidator>
export type ParamsType = { params: { assetAttrId: string } }

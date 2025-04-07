import { z } from 'zod'

export const AssetCreateValidator = z
  .object({
    asset_name: z.string().min(1, 'Asset name is required'),
    registered_to: z.string().min(1, 'Registered to is required'),
    registered_date: z.string({
      required_error: 'Registered date is required',
    }),
    address: z.string().min(1, 'Address is required'),
    land_tax_amount: z
      .number()
      .min(0, 'Land tax amount must be a positive number'),
    features: z.object({
      number_of_doors: z
        .number()
        .min(0, 'Number of doors must be a positive number'),
      number_of_windows: z
        .number()
        .min(0, 'Number of windows must be a positive number'),
      number_of_taps: z
        .number()
        .min(0, 'Number of taps must be a positive number'),
      number_of_fans: z
        .number()
        .min(0, 'Number of fans must be a positive number'),
      number_of_bulbs: z
        .number()
        .min(0, 'Number of bulbs must be a positive number'),
      has_sump: z.boolean({ required_error: 'Has sump is required' }),
      is_rented: z.boolean({ required_error: 'Is rented is required' }),
    }),
    asset_type: z.string().min(1, 'Asset type is required'),
    remarks: z.string().optional(),
  })
  .strict()

export const AssetUpdateValidator = z
  .object({
    asset_name: z.string().min(1, 'Asset name is required').optional(),
    registered_to: z.string().min(1, 'Registered to is required').optional(),
    registered_date: z
      .string({ required_error: 'Registered date is required' })
      .optional(),
    address: z.string().min(1, 'Address is required').optional(),
    land_tax_amount: z
      .number()
      .min(0, 'Land tax amount must be a positive number')
      .optional(),
    features: z.object({
      number_of_doors: z
        .number()
        .min(0, 'Number of doors must be a positive number')
        .optional(),
      number_of_windows: z
        .number()
        .min(0, 'Number of windows must be a positive number')
        .optional(),
      number_of_taps: z
        .number()
        .min(0, 'Number of taps must be a positive number')
        .optional(),
      number_of_fans: z
        .number()
        .min(0, 'Number of fans must be a positive number')
        .optional(),
      number_of_bulbs: z
        .number()
        .min(0, 'Number of bulbs must be a positive number')
        .optional(),
      has_sump: z
        .boolean({ required_error: 'Has sump is required' })
        .optional(),
      is_rented: z
        .boolean({ required_error: 'Is rented is required' })
        .optional(),
    }),
    asset_type: z.string().min(1, 'Asset type is required').optional(),
    remarks: z.string().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    const allowedKeys = [
      'asset_name',
      'registered_to',
      'registered_date',
      'address',
      'land_tax_amount',
      'features',
      'asset_type',
      'remarks',
    ]
    const allowedFeatureKeys = [
      'number_of_doors',
      'number_of_windows',
      'number_of_taps',
      'number_of_fans',
      'number_of_bulbs',
      'has_sump',
      'is_rented',
    ]

    const extraKeys = Object.keys(data).filter(
      (key) => !allowedKeys.includes(key)
    )
    if (extraKeys.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Unexpected fields: ${extraKeys.join(', ')}`,
      })
    }

    if (data.features) {
      const featureExtraKeys = Object.keys(data.features).filter(
        (key) => !allowedFeatureKeys.includes(key)
      )
      if (featureExtraKeys.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Unexpected fields in features: ${featureExtraKeys.join(', ')}`,
        })
      }
    }
  })

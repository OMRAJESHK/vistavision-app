import { z } from 'zod'

export const assetAttributeValidator = z.object({
  asset_name: z.string().nonempty({
    message: 'Asset name is required.',
  }),
  sewage: z
    .object({
      setup: z.boolean({ required_error: 'Sewage setup is required.' }),
      details: z.string().nonempty({ message: 'Sewage details are required.' }),
      date: z.string({ required_error: 'Sewage date is required.' }),
      price: z.number({ required_error: 'Sewage price is required.' }),
    })
    .optional(),
  rainwater_harvesting: z
    .object({
      setup: z.boolean({
        required_error: 'Rainwater harvesting setup is required.',
      }),
      details: z
        .string()
        .nonempty({ message: 'Rainwater harvesting details are required.' }),
      date: z.string({
        required_error: 'Rainwater harvesting date is required.',
      }),
      price: z.number({
        required_error: 'Rainwater harvesting price is required.',
      }),
    })
    .optional(),
  solar: z
    .object({
      setup: z.boolean({ required_error: 'Solar setup is required.' }),
      details: z.string().nonempty({ message: 'Solar details are required.' }),
      date: z.string({ required_error: 'Solar date is required.' }),
      price: z.number({ required_error: 'Solar price is required.' }),
    })
    .optional(),
  water_supply: z
    .object({
      setup: z.boolean({ required_error: 'Water supply setup is required.' }),
      details: z
        .string()
        .nonempty({ message: 'Water supply details are required.' }),
      date: z.string({ required_error: 'Water supply date is required.' }),
      price: z.number({ required_error: 'Water supply price is required.' }),
    })
    .optional(),
  electricity: z
    .object({
      setup: z.boolean({ required_error: 'Electricity setup is required.' }),
      details: z.object({
        current_meter: z.object({
          asset_account_number: z.string().nonempty({
            message: 'Electricity asset account number is required.',
          }),
          asset_rr_number: z
            .string()
            .nonempty({ message: 'Electricity asset RR number is required.' }),
        }),
      }),
      date: z.string({ required_error: 'Electricity date is required.' }),
      price: z.number({ required_error: 'Electricity price is required.' }),
    })
    .optional(),
  security: z
    .object({
      setup: z.boolean({ required_error: 'Security setup is required.' }),
      details: z
        .string()
        .nonempty({ message: 'Security details are required.' }),
      date: z.string({ required_error: 'Security date is required.' }),
      price: z.number({ required_error: 'Security price is required.' }),
    })
    .optional(),
  parking: z
    .object({
      setup: z.boolean({ required_error: 'Parking setup is required.' }),
      details: z
        .string()
        .nonempty({ message: 'Parking details are required.' }),
      date: z.string({ required_error: 'Parking date is required.' }),
      price: z.number({ required_error: 'Parking price is required.' }),
    })
    .optional(),
  water_heater: z
    .object({
      setup: z.boolean({ required_error: 'Water heater setup is required.' }),
      details: z
        .string()
        .nonempty({ message: 'Water heater details are required.' }),
      date: z.string({ required_error: 'Water heater date is required.' }),
      price: z.number({ required_error: 'Water heater price is required.' }),
    })
    .optional(),
  remarks: z.string().optional(),
})

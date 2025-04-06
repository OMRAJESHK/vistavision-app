import mongoose from 'mongoose'

const AssetSchema = new mongoose.Schema({
  asset_name: { type: String, required: true },
  registered_to: { type: String, required: true },
  registered_date: { type: Date, required: true },
  address: { type: String, required: true },
  land_tax_amount: { type: Number, required: true },
  created_date: { type: Date, default: Date.now },
  modified_date: { type: Date, default: Date.now },
  features: {
    number_of_doors: { type: Number, required: true },
    number_of_windows: { type: Number, required: true },
    number_of_taps: { type: Number, required: true },
    number_of_fans: { type: Number, required: true },
    number_of_bulbs: { type: Number, required: true },
    has_sump: { type: Boolean, required: true },
    is_rented: { type: Boolean, required: true },
  },
  asset_type: { type: String, required: true },
  remarks: { type: String },
})

const Asset = mongoose.models.assets || mongoose.model('assets', AssetSchema)
export default Asset

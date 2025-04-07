import mongoose from 'mongoose'

const AssetAttributeSchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: 'assets' },
  sewage: {
    setup: { type: Boolean },
    details: { type: String },
    date: { type: String },
    price: { type: Number },
  },
  rainwater_harvesting: {
    setup: { type: Boolean },
    details: { type: String },
    date: { type: String },
    price: { type: Number },
  },
  solar: {
    setup: { type: Boolean },
    details: { type: String },
    date: { type: String },
    price: { type: Number },
  },
  water_supply: {
    setup: { type: Boolean },
    details: { type: String },
    date: { type: String },
    price: { type: Number },
  },
  electricity: {
    setup: { type: Boolean },
    details: {
      current_meter: {
        asset_account_number: { type: String },
        asset_rr_number: { type: String },
      },
    },
    date: { type: String },
    price: { type: Number },
  },
  security: {
    setup: { type: Boolean },
    details: { type: String },
    date: { type: String },
    price: { type: Number },
  },
  parking: {
    setup: { type: Boolean },
    details: { type: String },
    date: { type: String },
    price: { type: Number },
  },
  water_heater: {
    setup: { type: Boolean },
    details: { type: String },
    date: { type: String },
    price: { type: Number },
  },
  remarks: { type: String },
})

const AssetAttribute =
  mongoose.models.assetAttributes ||
  mongoose.model('assetAttributes', AssetAttributeSchema)
export default AssetAttribute

import mongoose from "mongoose"

const shippingSchema = mongoose.Schema({
  country: { type: String, required: true, unique: true },
  local: { type: String, required: true },
  options: [
    {
      minWeight: { type: Number, required: true, default: 0 },
      maxWeight: { type: Number, required: true, default: 0 },
      operator: { type: String, required: false, default: "" },
      cost: { type: Number, required: false, default: 0 }
    }
  ]
})

const Shipping = mongoose.model("Shipping", shippingSchema)

export default Shipping

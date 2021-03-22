import mongoose from "mongoose"

const shippingSchema = mongoose.Schema({
  country: { type: String, required: true },
  local: { type: String, required: true },
  options: [
    {
      minWeight: { type: Number, required: true },
      maxWeight: { type: Number, required: true },
      operator: { type: String, required: true },
      cost: { type: Number, required: true }
    }
  ]
})

const Shipping = mongoose.model("Shipping", shippingSchema)

export default Shipping

import mongoose from "mongoose"

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    items: [
      {
        art: { type: String, required: true },
        name: { type: String, required: true },
        brand: { type: String, required: true },
        color: { type: String, required: true },
        qty: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product"
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

const Cart = mongoose.model("Cart", cartSchema)

export default Cart

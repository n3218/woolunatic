import mongoose from "mongoose"

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
      ref: "User"
    },
    items: [
      {
        art: { type: String, required: false },
        brand: { type: String, required: false },
        name: { type: String, required: false },
        color: { type: String, required: false },
        fibers: { type: String, required: false },
        meterage: { type: String, required: false },
        image: { type: String, required: false },
        message: { type: String, required: false },
        price: { type: Number, required: false },
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

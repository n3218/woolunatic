import mongoose from "mongoose"

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    orderItems: [
      {
        art: { type: String, required: true },
        name: { type: String, required: true },
        brand: { type: String, required: true },
        fibers: { type: String, required: true },
        meterage: { type: String, required: true },
        color: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: false },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product"
        }
      }
    ],
    shippingAddress: {
      address: { type: String, required: false },
      city: { type: String, required: false },
      zipCode: { type: String, required: false },
      country: { type: String, required: false }
    },
    paymentMethod: { type: String, required: false },
    paymentResult: {
      id: { type: String, required: false },
      status: { type: String, required: false },
      update_time: { type: String, required: false },
      email_address: { type: String, required: false },
      links: { type: String, required: false }
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    storecredit: { type: Number, required: false, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    itemsWeight: { type: Number, required: true, default: 0 },
    totalWeight: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model("Order", orderSchema)

export default Order

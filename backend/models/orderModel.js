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
      address: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: false },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
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

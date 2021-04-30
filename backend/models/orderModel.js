import mongoose from "mongoose"
// import autoIncrement from "mongoose-auto-increment"

var connection = mongoose.createConnection(process.env.MONGO_URI)

// autoIncrement.initialize(connection)

const orderSchema = mongoose.Schema(
  {
    orderId: { type: Number, required: true, unique: true, default: 210000 },
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
      address: { type: String, required: false, default: "" },
      city: { type: String, required: false, default: "" },
      zipCode: { type: String, required: false, default: "" },
      country: { type: String, required: false, default: "" },
      phone: { type: String, required: false, default: "" },
      shippingOption: {
        minWeight: { type: Number, required: false, default: 0 },
        maxWeight: { type: Number, required: false, default: 0 },
        operator: { type: String, required: false, default: "" },
        cost: { type: Number, required: false, default: 0 },
        shippingCode: { type: String, required: false, default: "" },
        shippingLink: { type: String, required: false, default: "" }
      }
    },
    paymentMethod: { type: String, required: false },
    paymentResult: {
      id: { type: String, required: false },
      status: { type: String, required: false },
      update_time: { type: String, required: false },
      email_address: { type: String, required: false },
      links: { type: String, required: false }
    },
    storecredit: { type: Number, required: false, default: 0.0 },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    itemsWeight: { type: Number, required: true, default: 0 },
    totalWeight: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    comment: { type: String, required: false },
    cancellation: {
      cancelled: { type: Boolean, required: false, default: false },
      cancelledAt: { type: Date },
      notes: { type: String, required: false },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User"
      }
    }
  },
  {
    timestamps: true
  }
)

// orderSchema.plugin(autoIncrement.plugin, {
//   model: "Order",
//   field: "orderId",
//   startAt: 210000,
//   incrementBy: 1
// })

orderSchema.pre("save", function (next) {
  // Only increment when the document is new
  if (this.isNew) {
    Order.count().then(res => {
      const newOrderId = 210000 + res
      this.orderId = newOrderId // Increment count
      next()
    })
  } else {
    next()
  }
})

const Order = mongoose.model("Order", orderSchema)

export default Order
